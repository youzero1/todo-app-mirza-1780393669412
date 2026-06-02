import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-2xl" style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)' }}>
        <CheckSquare className="w-7 h-7 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">My Todos</h1>
        <p className="text-sm" style={{ color: '#94a3b8' }}>Stay organized, stay productive</p>
      </div>
    </div>
  );
}
