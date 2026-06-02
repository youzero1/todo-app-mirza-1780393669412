import { Search, Trash2 } from 'lucide-react';
import { Filter } from '@/types';
import clsx from 'clsx';

type FilterBarProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  search: string;
  setSearch: (s: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  clearCompleted: () => void;
  hasCompleted: boolean;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export default function FilterBar({
  filter,
  setFilter,
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  clearCompleted,
  hasCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-center flex-wrap">
        <div className="flex gap-1 rounded-xl p-1 flex-shrink-0" style={{ background: '#1e1e2e' }}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={clsx(
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                filter === f.value ? 'text-white' : ''
              )}
              style={{
                background:
                  filter === f.value
                    ? 'linear-gradient(135deg, #6366f1, #a78bfa)'
                    : 'transparent',
                color: filter === f.value ? 'white' : '#94a3b8',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div
          className="flex-1 min-w-40 flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ background: '#1e1e2e', border: '1px solid #2a2a3e' }}
        >
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: '#94a3b8' }} />
          <input
            type="text"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Search todos..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#e2e8f0' }}
          />
        </div>

        {hasCompleted && (
          <button
            onClick={clearCompleted}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all"
            style={{ background: '#1e1e2e', color: '#f87171', border: '1px solid #2a2a3e' }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Done
          </button>
        )}
      </div>

      {categories.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all capitalize"
              style={{
                background: selectedCategory === cat ? '#6366f1' : '#1e1e2e',
                color: selectedCategory === cat ? 'white' : '#94a3b8',
                border: `1px solid ${selectedCategory === cat ? '#6366f1' : '#2a2a3e'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
