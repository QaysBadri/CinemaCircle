package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprintf(w, `{"message": "Hello World"}`)
}

func main() {
    //Creating a new router using mux
    r := mux.NewRouter()

    //API routes
    r.HandleFunc("/hello", helloHandler)

    //handler
    c := cors.AllowAll()

    //CORS middleware wrapper
    handler := c.Handler(r)

    fmt.Println("Server is running on :8080")
    http.Handle("/", handler)
    http.ListenAndServe(":8080", nil)
}
