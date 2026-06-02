import clsx from 'clsx';

type StatsBarProps = {
  stats: {
    total: number;
    active: number;
    completed: number;
  };
};

type StatCardProps = {
  label: string;
  value: number;
  color: string;
};

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div
      className="flex-1 rounded-2xl p-4 flex flex-col items-center gap-1"
      style={{ background: '#1e1e2e', border: '1px solid #2a2a3e' }}
    >
      <span className={clsx('text-2xl font-bold', color)}>{value}</span>
      <span className="text-xs" style={{ color: '#94a3b8' }}>{label}</span>
    </div>
  );
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex gap-3">
      <StatCard label="Total" value={stats.total} color="text-white" />
      <StatCard label="Active" value={stats.active} color="text-violet-400" />
      <StatCard label="Completed" value={stats.completed} color="text-emerald-400" />
    </div>
  );
}
