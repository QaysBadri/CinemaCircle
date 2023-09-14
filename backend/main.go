package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    // Set the Content-Type header to indicate JSON data (optional).
    w.Header().Set("Content-Type", "application/json")

    // Write the "Hello, World!" string to the response.
    fmt.Fprintf(w, `{"message": "Hello, World!"}`)
}

func main() {
    http.HandleFunc("/hello", helloHandler)
    fmt.Println("Server is running on :8080")
    http.ListenAndServe(":8080", nil)
}
