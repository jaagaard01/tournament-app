package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/jaagaard01/tournament-app/backend/types"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB

func initDB() {
	var err error
	// Update the connection string to match your PostgreSQL credentials
	connectionString := "postgres://admin:ADMIN-PASSWORD@localhost:5432/tournament-app?sslmode=disable"
	db, err = sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatalf("Could not ping to database: %v", err)
	}
}

func initEnv() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatal("JWT_SECRET is not set in .env file")
	}
	frontendUrl := os.Getenv("FRONTEND_URL")
	if frontendUrl == "" {
		log.Fatal("FRONTED_URL is not set in .env file")
	}
}

func corsMiddleware(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers for a specific origin
		w.Header().Set("Access-Control-Allow-Origin", os.Getenv("FRONTEND_URL"))
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		// Allow credentials
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Check if it's a preflight request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Serve the next handler
		handler.ServeHTTP(w, r)
	})
}

func generateJWT(email string) (string, error) {
	// Create the token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["email"] = email
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix() // Token expires in 72 hours

	// Generate encoded token and send it as response
	jwtSecret := os.Getenv("JWT_SECRET")
	return token.SignedString([]byte(jwtSecret))
}

func createUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Only POST method is allowed", http.StatusMethodNotAllowed)
		return
	}

	var user types.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Check for duplicate email
	var userID int
	err = db.QueryRow("SELECT id FROM users WHERE email = $1", user.Email).Scan(&userID)
	if err != sql.ErrNoRows {
		if err != nil {
			http.Error(w, "Failed to query existing users", http.StatusInternalServerError)
			return
		}
		http.Error(w, "Email is already in use", http.StatusConflict) // Use HTTP 409 Conflict for duplicate resource
		return
	}

	// Hashing the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	query := `INSERT INTO users (email, name, password) VALUES ($1, $2, $3)`
	_, err = db.Exec(query, user.Email, user.Name, string(hashedPassword)) // Store the hashed password
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	token, err := generateJWT(user.Email)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}

func loginUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Only POST method is allowed", http.StatusMethodNotAllowed)
		return
	}

	var loginRequest struct {
		Email    string
		Password string
	}
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Retrieve the user from the database
	var user types.User
	var hashedPassword string
	err = db.QueryRow("SELECT email, password FROM users WHERE email = $1", loginRequest.Email).Scan(&user.Email, &hashedPassword)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Check if the password matches
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(loginRequest.Password))
	if err != nil {
		http.Error(w, "Invalid login credentials", http.StatusUnauthorized)
		return
	}

	// Generate JWT token
	token, err := generateJWT(user.Email)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Return the token in the response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}

func main() {
	initEnv()
	initDB()
	defer db.Close()
	mux := http.NewServeMux()

	mux.HandleFunc("/createAccount", createUser)
	mux.HandleFunc("/login", loginUser)

	handlerWithCORS := corsMiddleware(mux)

	fmt.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", handlerWithCORS); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
