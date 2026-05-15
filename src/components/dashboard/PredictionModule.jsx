import { BrainCircuit, Shield, TrendingDown } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { ProgressionChart } from '../visuals/ProgressionChart';

export function PredictionModule({ progressionData = [], prediction }) {
  return (
    <GlassCard>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Future prediction</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            {prediction?.message}
          </p>
        </div>
        <div className="rounded-2xl bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-700">
          {prediction?.confidence}% confidence
        </div>
      </div>
      <ProgressionChart data={progressionData} />
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4">
          <TrendingDown className="text-blue-600" size={22} />
          <p className="mt-3 font-semibold text-slate-950">Likely direction</p>
          <p className="mt-1 text-sm text-slate-600">{prediction?.direction}</p>
        </div>
        <div className="rounded-2xl bg-green-50 p-4">
          <Shield className="text-green-700" size={22} />
          <p className="mt-3 font-semibold text-slate-950">Risk level</p>
          <p className="mt-1 text-sm text-slate-600">{prediction?.level}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <BrainCircuit className="text-slate-700" size={22} />
          <p className="mt-3 font-semibold text-slate-950">Suggested focus</p>
          <p className="mt-1 text-sm text-slate-600">Track symptoms and upload the next report after follow-up.</p>
        </div>
      </div>
    </GlassCard>
  );
}
