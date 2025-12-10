import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'todos.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

let db = null;

/**
 * Seed database with example todos
 */
function seedDatabase(database) {
  try {
    // Check if todos already exist
    const count = database.prepare('SELECT COUNT(*) as count FROM todos').get();
    
    if (count.count === 0) {
      // Insert sample todos
      const insert = database.prepare('INSERT INTO todos (text, completed) VALUES (?, ?)');
      
      const sampleTodos = [
        { text: '🎨 Design a beautiful UI', completed: 1 },
        { text: '⚡ Build awesome features', completed: 0 },
        { text: '🚀 Deploy to production', completed: 0 }
      ];
      
      for (const todo of sampleTodos) {
        insert.run(todo.text, todo.completed);
      }
      
      console.log('✨ Database seeded with example todos');
    }
  } catch (error) {
    console.error('⚠️  Warning: Failed to seed database:', error);
  }
}

/**
 * Initialize the SQLite database
 */
function initDatabase() {
  try {
    // Create database connection
    db = new Database(DB_PATH, { verbose: console.log });
    
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
    
    // Read and execute schema
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);
    
    console.log('✅ Database initialized successfully');
    console.log(`📁 Database location: ${DB_PATH}`);
    
    // Seed with example data if empty
    seedDatabase(db);
    
    return db;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

/**
 * Get database instance
 */
function getDatabase() {
  if (!db) {
    db = initDatabase();
  }
  return db;
}

/**
 * Close database connection
 */
function closeDatabase() {
  if (db) {
    db.close();
    db = null;
    console.log('🔒 Database connection closed');
  }
}

export {
  initDatabase,
  getDatabase,
  closeDatabase
};

