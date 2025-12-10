import type { Todo } from "../types/todo";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network error or other issues
    throw new ApiError(0, error instanceof Error ? error.message : "Network error");
  }
}

/**
 * Fetch all todos from the server
 */
export async function fetchTodos(): Promise<Todo[]> {
  return fetchWithErrorHandling<Todo[]>(`${API_BASE_URL}/todos`);
}

/**
 * Create a new todo on the server
 */
export async function createTodo(text: string): Promise<Todo> {
  return fetchWithErrorHandling<Todo>(`${API_BASE_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

/**
 * Update a todo on the server
 */
export async function updateTodo(
  id: number,
  updates: Partial<Pick<Todo, "text" | "completed">>
): Promise<Todo> {
  return fetchWithErrorHandling<Todo>(`${API_BASE_URL}/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

/**
 * Delete a todo from the server
 */
export async function deleteTodo(id: number): Promise<void> {
  return fetchWithErrorHandling<void>(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
}

/**
 * Check server health
 */
export async function checkHealth(): Promise<{ status: string; message: string }> {
  return fetchWithErrorHandling(`${API_BASE_URL}/health`);
}
