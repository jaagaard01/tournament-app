package types

import "time"

type User struct {
	Email     string    `json:"email"`
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"createdAt"`
}
