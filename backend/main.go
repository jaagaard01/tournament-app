package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/jaagaard01/tournament-app/backend/types"
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

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "User successfully created")
}

func main() {
	initDB()
	defer db.Close()

	http.HandleFunc("/createAccount", createUser)

	fmt.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
