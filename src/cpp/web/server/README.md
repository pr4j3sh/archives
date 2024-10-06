# REST API Server with C++

This is a simple REST API server built using `cpprestsdk`. It allows basic CRUD (Create, Read, Update, Delete) operations via HTTP requests.

## Dependencies

- `cpprestsdk` [source](https://github.com/microsoft/cpprestsdk)|[download on arch](https://aur.archlinux.org/packages/cpprestsdk)

## Installation

1. Install `cpprestsdk` and its dependencies:

   ```bash
   yay -S cpprestsdk
   ```

## Usage

1. To compile the project, run:

   ```bash
   make
   ```

2. Run the server:
   ```bash
   ./build/main
   ```

## API Endpoints

- **Read**:  
  Send a GET request to:  
  `http://127.0.0.1:8000/api/read`

- **Create**:  
  Send a POST request to:  
  `http://127.0.0.1:8000/api/create`

- **Update**:  
  Send a PUT request to:  
  `http://127.0.0.1:8000/api/update/:id`  
  Replace `:id` with the actual ID you want to update.

- **Delete**:  
  Send a DELETE request to:  
  `http://127.0.0.1:8000/api/delete/:id`  
  Replace `:id` with the ID of the item you want to delete.
