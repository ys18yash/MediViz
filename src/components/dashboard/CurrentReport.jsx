import { ArrowDownRight, ArrowUpRight, CalendarCheck, Download, PlayCircle } from 'lucide-react';
import { SeverityGauge } from '../visuals/SeverityGauge';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

export function CurrentReport({ report, realtime, onStartAnalysis }) {
  const isWorsened = report.change > 0;
  const isImproved = report.change < 0;
  const ChangeIcon = isWorsened ? ArrowUpRight : ArrowDownRight;
  const changeText = isWorsened
    ? 'Higher than previous report'
    : isImproved
      ? 'Improved from last report'
      : 'No major change vs previous';

  return (
    <GlassCard className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
      <div className="overflow-hidden rounded-[22px] bg-slate-100">
        <img src={report.preview} alt="Medical scan preview" className="h-full min-h-[300px] w-full object-cover" />
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">{report.status}</span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{realtime.message}</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">{report.title}</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{report.summary}</p>
        </div>
        <SeverityGauge value={report.severity} />
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-blue-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">Change</p>
            <p className="mt-2 flex items-center gap-1 text-2xl font-semibold text-slate-950">
              <ChangeIcon className={isWorsened ? 'text-rose-600' : 'text-green-600'} size={22} /> {Math.abs(report.change)} pts
            </p>
            <p className="mt-1 text-xs text-slate-500">{changeText}</p>
          </div>
          <div className="rounded-2xl bg-teal-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">AI confidence</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{report.confidence}%</p>
            <p className="mt-1 text-xs text-slate-500">Strong visual match</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Next review</p>
            <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-slate-950">
              <CalendarCheck size={19} /> 18 May
            </p>
            <p className="mt-1 text-xs text-slate-500">Routine check-in</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={onStartAnalysis}>
            <PlayCircle size={18} /> Start fresh analysis
          </Button>
          <Button variant="secondary">
            <Download size={18} /> Save report
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
