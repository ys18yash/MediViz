import { ScanSearch } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function BeforeAfter({ report }) {
  return (
    <GlassCard>
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <ScanSearch size={21} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Before vs after</h2>
          <p className="text-sm text-slate-500">A simple comparison of visible change.</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-[22px] bg-slate-100">
          <img src={report.preview} alt="Previous scan visual" className="h-56 w-full scale-105 object-cover grayscale" />
          <div className="bg-white/85 p-3">
            <p className="text-sm font-semibold text-slate-950">Previous report</p>
            <p className="text-xs text-slate-500">More visible irritation</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-[22px] bg-slate-100 ring-2 ring-blue-100">
          <img src={report.preview} alt="Latest scan visual" className="h-56 w-full object-cover" />
          <div className="bg-blue-50/85 p-3">
            <p className="text-sm font-semibold text-blue-950">Latest report</p>
            <p className="text-xs text-blue-700">Clearer, calmer pattern</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
