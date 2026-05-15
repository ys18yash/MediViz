import { Activity, HeartPulse, Stethoscope, Wind } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const organIcons = [Wind, HeartPulse, Stethoscope, Activity];

export function OrganStatus({ organStatus = [] }) {
  return (
    <GlassCard>
      <h2 className="mb-5 text-2xl font-semibold text-slate-950">Body area status</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {organStatus.map((item, index) => {
          const Icon = organIcons[index];
          return (
            <div key={item.organ} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={19} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">{item.organ}</p>
                    <p className="text-xs text-slate-500">{item.label}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-slate-950">{item.score}</p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-400" style={{ width: `${item.score}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
