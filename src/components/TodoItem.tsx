import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import { Todo } from '@/types';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_STYLES: Record<string, { dot: string; border: string }> = {
  low: { dot: '#34d399', border: '#34d39933' },
  medium: { dot: '#fbbf24', border: '#fbbf2433' },
  high: { dot: '#f87171', border: '#f8717133' },
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);

  const ps = PRIORITY_STYLES[todo.priority] || PRIORITY_STYLES.medium;

  function handleEditSave() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <div
      className="group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all"
      style={{
        background: '#1e1e2e',
        border: `1px solid ${todo.completed ? '#2a2a3e' : ps.border}`,
      }}
    >
      {/* Priority dot */}
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: todo.completed ? '#313150' : ps.dot }}
      />

      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all',
          todo.completed ? 'border-violet-500' : 'border-gray-600'
        )}
        style={{
          background: todo.completed ? '#6366f1' : 'transparent',
        }}
      >
        {todo.completed && <Check className="w-3 h-3 text-white" />}
      </button>

      {/* Text / Edit */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleEditKeyDown}
            onBlur={handleEditSave}
            className="w-full rounded-lg px-2 py-1 text-sm outline-none"
            style={{ background: '#2a2a3e', color: '#e2e8f0', border: '1px solid #6366f1' }}
          />
        ) : (
          <div>
            <p
              className={clsx(
                'text-sm leading-snug truncate',
                todo.completed ? 'line-through' : 'text-white'
              )}
              style={{ color: todo.completed ? '#94a3b8' : '#e2e8f0' }}
            >
              {todo.text}
            </p>
            <span
              className="text-xs px-1.5 py-0.5 rounded-md mt-0.5 inline-block"
              style={{ background: '#2a2a3e', color: '#94a3b8' }}
            >
              {todo.category}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg transition-all"
            style={{ color: '#94a3b8' }}
            title="Edit"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
        {editing && (
          <button
            onClick={() => { setEditText(todo.text); setEditing(false); }}
            className="p-1.5 rounded-lg transition-all"
            style={{ color: '#94a3b8' }}
            title="Cancel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 rounded-lg transition-all"
          style={{ color: '#f87171' }}
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
