import { CalendarPlus, MessageSquareText, Share2, Upload } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const actions = [
  { label: 'Upload new scan', icon: Upload },
  { label: 'Ask care team', icon: MessageSquareText },
  { label: 'Share report', icon: Share2 },
  { label: 'Book follow-up', icon: CalendarPlus },
];

export function QuickActions() {
  return (
    <GlassCard>
      <h2 className="mb-5 text-2xl font-semibold text-slate-950">Quick actions</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              className="flex min-h-20 items-center gap-3 rounded-2xl border border-slate-100 bg-white/70 p-4 text-left font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={19} />
              </span>
              {action.label}
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
}
