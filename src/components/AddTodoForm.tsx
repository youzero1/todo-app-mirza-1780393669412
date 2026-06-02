import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '@/types';
import clsx from 'clsx';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-emerald-400' },
  { value: 'medium', label: 'Medium', color: 'text-amber-400' },
  { value: 'high', label: 'High', color: 'text-red-400' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setPriority('medium');
    setCategory('');
    setExpanded(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: '#1e1e2e', border: '1px solid #2a2a3e' }}
    >
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="Add a new todo..."
          className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: '#2a2a3e',
            color: '#e2e8f0',
            border: '1px solid #313150',
          }}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="rounded-xl px-4 py-3 font-semibold text-sm transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)', color: 'white' }}
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {expanded && (
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-col gap-1 flex-1 min-w-32">
            <label className="text-xs" style={{ color: '#94a3b8' }}>Priority</label>
            <div className="flex gap-2">
              {PRIORITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                    priority === opt.value
                      ? 'border-violet-500'
                      : 'border-transparent'
                  )}
                  style={{
                    background: priority === opt.value ? '#313150' : '#2a2a3e',
                    color: priority === opt.value ? '#e2e8f0' : '#94a3b8',
                  }}
                >
                  <span className={opt.color}>●</span> {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-32">
            <label className="text-xs" style={{ color: '#94a3b8' }}>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              placeholder="e.g. Work, Personal..."
              className="rounded-lg px-3 py-1.5 text-xs outline-none"
              style={{
                background: '#2a2a3e',
                color: '#e2e8f0',
                border: '1px solid #313150',
              }}
            />
          </div>
        </div>
      )}
    </form>
  );
}
