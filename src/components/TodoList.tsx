import { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';
import { ClipboardList } from 'lucide-react';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div
        className="rounded-2xl p-12 flex flex-col items-center gap-4 text-center"
        style={{ background: '#1e1e2e', border: '1px solid #2a2a3e' }}
      >
        <ClipboardList className="w-12 h-12" style={{ color: '#313150' }} />
        <div>
          <p className="text-lg font-semibold text-white">No todos yet</p>
          <p className="text-sm" style={{ color: '#94a3b8' }}>Add your first todo above to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
