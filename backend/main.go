package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprintf(w, `{"message": "Hello World"}`)
}

func main() {
    // retrieves the environment variables
    godotenv.Load();
    host := os.Getenv("PGHOST")
    user := os.Getenv("PGUSER")
    password := os.Getenv("PGPASSWORD")
    dbname := os.Getenv("PGDATABASE")
    port := os.Getenv("PGPORT")

    // sets the connection string
    connectionstring := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, dbname, port)
    fmt.Println(connectionstring)

    // API routes go here
    r := mux.NewRouter()
    r.HandleFunc("/hello", helloHandler)

    // handler
    c := cors.AllowAll()

    // CORS middleware wrapper
    handler := c.Handler(r)

    fmt.Println("Server is running on :8080")
    http.Handle("/", handler)
    http.ListenAndServe(":8080", nil)
}
