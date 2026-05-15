import { CheckCircle2, Circle, TrendingDown } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function Timeline({ timeline = [] }) {
  return (
    <GlassCard>
      <h2 className="mb-6 text-2xl font-semibold text-slate-950">Previous reports timeline</h2>
      <div className="relative space-y-5 pl-5 before:absolute before:left-[9px] before:top-2 before:h-[calc(100%-18px)] before:w-px before:bg-blue-100">
        {timeline.map((item) => {
          const Icon = item.type === 'improved' ? TrendingDown : item.type === 'watch' ? Circle : CheckCircle2;
          return (
            <div key={`${item.date}-${item.title}`} className="relative">
              <div className="absolute -left-5 top-1 grid h-5 w-5 place-items-center rounded-full bg-white text-blue-600 ring-4 ring-blue-50">
                <Icon size={14} />
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">{item.date}</p>
                <h3 className="mt-1 font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
