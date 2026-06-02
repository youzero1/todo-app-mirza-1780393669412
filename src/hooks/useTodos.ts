import { useState, useEffect } from 'react';
import { Todo, Priority, Filter } from '@/types';

const STORAGE_KEY = 'todo-app-todos';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Todo[];
  } catch (e: any) {
    console.error('Failed to load todos', e.message);
  }
  return [];
}

function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e: any) {
    console.error('Failed to save todos', e.message);
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text: string, priority: Priority, category: string): void {
    if (!text.trim()) return;
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
      category: category.trim() || 'General',
    };
    setTodos((prev) => [todo, ...prev]);
  }

  function toggleTodo(id: string): void {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: string): void {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id: string, text: string): void {
    if (!text.trim()) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t))
    );
  }

  function clearCompleted(): void {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  function reorderTodos(from: number, to: number): void {
    setTodos((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  }

  const categories = ['all', ...Array.from(new Set(todos.map((t) => t.category)))];

  const filtered = todos.filter((t) => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed;
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesFilter && matchesSearch && matchesCategory;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return {
    todos: filtered,
    filter,
    setFilter,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    reorderTodos,
    stats,
  };
}
