package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

type Response struct {
	Message string `json:"message"`
	Body    string `json:"body"`
	Id      string `json:"id"`
}

type RequestBody struct {
	Body string `json:"body"`
}

func handlerGet(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "invalid request method", http.StatusMethodNotAllowed)
		return
	}

	res := Response{Message: "online"}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(res); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}
}

func handlerPost(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var reqBody RequestBody

	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	res := Response{Message: "create", Body: reqBody.Body}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(res); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
	}
}

func handlerPut(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "invalid request method", http.StatusMethodNotAllowed)
		return
	}

	id := strings.TrimPrefix(r.URL.Path, "/api/update/")

	var reqBody RequestBody

	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	res := Response{Message: "update", Body: reqBody.Body, Id: id}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(res); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
	}
}

func handlerDel(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "invalid request method", http.StatusMethodNotAllowed)
		return
	}

	id := strings.TrimPrefix(r.URL.Path, "/api/delete/")

	res := Response{Message: "online", Id: id}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(res); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}
}

func main() {
	hostname := "127.0.0.1"
	port := "8000"
	address := fmt.Sprintf("%s:%s", hostname, port)

	message := fmt.Sprintf("server running @ http://%s", address)
	fmt.Println(message)

	http.HandleFunc("/api/read", handlerGet)
	http.HandleFunc("/api/create", handlerPost)
	http.HandleFunc("/api/update/", handlerPut)
	http.HandleFunc("/api/delete/", handlerDel)

	if err := http.ListenAndServe(address, nil); err != nil {
		fmt.Println("server error:", err)
	}
}
