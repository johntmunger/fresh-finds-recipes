import express from 'express';
import { getDatabase } from '../db/init.js';

const router = express.Router();

/**
 * GET /api/todos
 * Fetch all todos
 */
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const todos = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all();
    
    // Convert SQLite integer to boolean for completed field
    const formattedTodos = todos.map(todo => ({
      id: todo.id,
      text: todo.text,
      completed: Boolean(todo.completed)
    }));
    
    res.json(formattedTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

/**
 * POST /api/todos
 * Create a new todo
 */
router.post('/', (req, res) => {
  try {
    const { text } = req.body;
    
    // Validation
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Todo text is required' });
    }
    
    const db = getDatabase();
    const stmt = db.prepare('INSERT INTO todos (text, completed) VALUES (?, ?)');
    const result = stmt.run(text.trim(), 0);
    
    // Fetch the newly created todo
    const newTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json({
      id: newTodo.id,
      text: newTodo.text,
      completed: Boolean(newTodo.completed)
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

/**
 * PUT /api/todos/:id
 * Update a todo (toggle completion or edit text)
 */
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    
    const db = getDatabase();
    
    // Check if todo exists
    const existingTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    // Build update query dynamically based on provided fields
    const updates = [];
    const values = [];
    
    if (text !== undefined) {
      if (typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid todo text' });
      }
      updates.push('text = ?');
      values.push(text.trim());
    }
    
    if (completed !== undefined) {
      updates.push('completed = ?');
      values.push(completed ? 1 : 0);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = db.prepare(`UPDATE todos SET ${updates.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    
    // Fetch updated todo
    const updatedTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    
    res.json({
      id: updatedTodo.id,
      text: updatedTodo.text,
      completed: Boolean(updatedTodo.completed)
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

/**
 * DELETE /api/todos/:id
 * Delete a todo
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const db = getDatabase();
    
    // Check if todo exists
    const existingTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    stmt.run(id);
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;

