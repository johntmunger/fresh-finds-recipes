import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from './db/init.js';
import todosRouter from './routes/todos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Initialize database
initDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// In production, serve the built frontend
if (isProduction) {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
}

// API Routes
app.use('/api/todos', todosRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// In production, serve index.html for all non-API routes (SPA support)
if (isProduction) {
  app.use((req, res, next) => {
    // If the request is not for an API route and not for a static file, serve index.html
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
    } else {
      next();
    }
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${path.join(__dirname, 'db', 'todos.db')}`);
});

export default app;

