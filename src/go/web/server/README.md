# CRUD Operations with Go

This project implements a simple CRUD (Create, Read, Update, Delete) API using Go. It includes endpoints for managing data with basic operations.

## Dependencies

- **Go**: Ensure you have Go installed. You can download it from [golang.org](https://golang.org/dl/).
- **Make**: A build automation tool. Ensure it is installed on your system.

## Usage

### Build the Project

To build the project, navigate to the `server` directory and run:

```bash
make
```

### Run the Server

After building, you can run the server with:

```bash
make run
```

### API Endpoints

Once the server is running, you can interact with the following API endpoints:

- **Read**: Get the status of the server.

  - **GET** `http://127.0.0.1:8000/api/read`

- **Create**: Create a new resource.

  - **POST** `http://127.0.0.1:8000/api/create`
  - **Request Body**:
    ```json
    {
      "body": "Your message here"
    }
    ```

- **Update**: Update an existing resource by ID.

  - **PUT** `http://127.0.0.1:8000/api/update/{id}`
  - **Request Body**:
    ```json
    {
      "body": "Updated message here"
    }
    ```

- **Delete**: Delete a resource by ID.
  - **DELETE** `http://127.0.0.1:8000/api/delete/{id}`

### Example Usage

Here are some example commands using `curl` to interact with the API:

- **GET** request:

  ```bash
  curl http://127.0.0.1:8000/api/read
  ```

- **POST** request:

  ```bash
  curl -X POST http://127.0.0.1:8000/api/create -H "Content-Type: application/json" -d '{"body":"Hello, world!"}'
  ```

- **PUT** request:

  ```bash
  curl -X PUT http://127.0.0.1:8000/api/update/1 -H "Content-Type: application/json" -d '{"body":"Updated message"}'
  ```

- **DELETE** request:
  ```bash
  curl -X DELETE http://127.0.0.1:8000/api/delete/1
  ```
