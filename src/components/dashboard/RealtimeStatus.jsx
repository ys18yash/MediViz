import { Activity, Wifi } from 'lucide-react';

export function RealtimeStatus({ event }) {
  return (
    <div className="rounded-[24px] border border-blue-100 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wifi className="text-blue-600" size={18} />
          <p className="text-sm font-semibold text-slate-950">Live report sync</p>
        </div>
        <Activity className="text-teal-500" size={18} />
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-500" style={{ width: `${event.progress}%` }} />
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-500">{event.message}</p>
    </div>
  );
}
