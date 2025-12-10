# Todo App Backend API

RESTful API server for the Vue Todo application, built with Express.js and SQLite.

## Tech Stack

- **Express.js** - Web framework for Node.js
- **better-sqlite3** - Fast, synchronous SQLite3 client
- **CORS** - Cross-Origin Resource Sharing middleware

## Setup

The backend server is automatically started when you run `npm run dev` from the project root. It will:

1. Initialize the SQLite database if it doesn't exist
2. Create the necessary tables and indexes
3. Start listening on port 3001

### Manual Start

To run only the backend server:

```bash
npm run dev:server
```

## Database

### Location

The SQLite database is stored at:

```
server/db/todos.db
```

### Schema

**todos** table:

| Column     | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| id         | INTEGER  | Primary key (auto-increment) |
| text       | TEXT     | Todo text content (required) |
| completed  | INTEGER  | Completion status (0 or 1)   |
| created_at | DATETIME | Creation timestamp           |
| updated_at | DATETIME | Last update timestamp        |

### Indexes

- `idx_completed` - Index on completed field for faster filtering
- `idx_created_at` - Index on created_at for ordered queries

## API Endpoints

Base URL: `http://localhost:3001/api`

### Health Check

Check if the server is running.

**GET** `/api/health`

**Response:**

```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

### Get All Todos

Fetch all todos from the database.

**GET** `/api/todos`

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "text": "Buy groceries",
    "completed": false
  },
  {
    "id": 2,
    "text": "Write documentation",
    "completed": true
  }
]
```

---

### Create Todo

Create a new todo item.

**POST** `/api/todos`

**Request Body:**

```json
{
  "text": "New todo item"
}
```

**Response:** `201 Created`

```json
{
  "id": 3,
  "text": "New todo item",
  "completed": false
}
```

**Error Responses:**

- `400 Bad Request` - Invalid or missing text field

---

### Update Todo

Update an existing todo (toggle completion or edit text).

**PUT** `/api/todos/:id`

**Request Body:**

```json
{
  "text": "Updated text", // Optional
  "completed": true // Optional
}
```

**Response:** `200 OK`

```json
{
  "id": 1,
  "text": "Updated text",
  "completed": true
}
```

**Error Responses:**

- `400 Bad Request` - Invalid data or no fields to update
- `404 Not Found` - Todo with specified ID doesn't exist

---

### Delete Todo

Delete a todo item.

**DELETE** `/api/todos/:id`

**Response:** `204 No Content`

**Error Responses:**

- `404 Not Found` - Todo with specified ID doesn't exist

---

## Error Handling

All endpoints return appropriate HTTP status codes and error messages:

```json
{
  "error": "Error message description"
}
```

Common status codes:

- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Auto-Reload

The server uses `nodemon` for automatic reloading during development. Any changes to server files will trigger a restart.

### Database Reset

To reset the database, simply delete the `server/db/todos.db` file. It will be recreated on the next server start.

### Logging

The server logs all SQL queries in verbose mode during development. Check the console output for debugging.

## Project Structure

```
server/
├── db/
│   ├── init.js           # Database initialization and connection
│   ├── schema.sql        # Database schema definition
│   ├── todos.db          # SQLite database file (auto-generated)
│   └── .gitignore        # Ignore database files
├── routes/
│   └── todos.js          # Todo CRUD endpoints
├── index.js              # Express server setup
└── README.md             # This file
```

## Troubleshooting

### Port Already in Use

If port 3001 is already in use, set a different port:

```bash
PORT=3002 npm run dev:server
```

### Database Lock Error

If you get a "database is locked" error:

1. Make sure no other process is accessing the database
2. Close any database viewers you might have open
3. Restart the server

### Connection Refused

If the frontend can't connect to the backend:

1. Verify the backend is running on port 3001
2. Check the Vite proxy configuration in `vite.config.ts`
3. Ensure CORS is properly configured

## Production Deployment

For production deployment:

1. Set environment variables:

   ```bash
   NODE_ENV=production
   PORT=3001
   ```

2. Consider using PM2 or similar process manager:

   ```bash
   pm2 start server/index.js --name "todo-api"
   ```

3. Set up proper database backups for the SQLite file

4. Use a reverse proxy (nginx/Apache) in front of the API server

5. Enable HTTPS for secure communication
