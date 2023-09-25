package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"encoding/json"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprintf(w, `{"message": "Hello World"}`)
}

func openDB() (*sql.DB, error) {
    godotenv.Load();
    host := os.Getenv("PGHOST")
    user := os.Getenv("PGUSER")
    password := os.Getenv("PGPASSWORD")
    dbname := os.Getenv("PGDATABASE")
    port := os.Getenv("PGPORT")

    connStr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, dbname, port)
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        return nil, err
    }
    return db, nil
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
    query := r.URL.Query().Get("query")

    //db connection
    db, err := openDB()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer db.Close()

    //database query to select only the movie titles from the azuredb
    // need to create a better searching algorithm for when we get a bigger database
    rows, err := db.Query("SELECT series_title FROM movies WHERE series_title ILIKE '%' || $1 || '%' LIMIT 5", query)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    //processing the search results and format as json
    var results []string
    for rows.Next() {
        var title string
        if err := rows.Scan(&title); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        results = append(results, title)
    }

    //encode the results as json and send them in the 
    jsonResponse, err := json.Marshal(results)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Write(jsonResponse)
}

func preflightHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*") // Replace with your allowed origins
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS") // Adjust allowed methods
    w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type") // Adjust allowed headers

    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }
}



func main() {
    
    r := mux.NewRouter()

    r.Methods("OPTIONS").HandlerFunc(preflightHandler)

    // API routes go here
    r.HandleFunc("/hello", helloHandler)
    r.HandleFunc("/search", searchHandler)

    // CORS middleware wrapper
    c := cors.AllowAll()

    handler := c.Handler(r)

    fmt.Println("Server is running on :8080")
    http.Handle("/", handler)
    http.ListenAndServe(":8080", nil)
}
