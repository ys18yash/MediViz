import { Download, FileText, LockKeyhole } from 'lucide-react';
import { reports } from '../../data/mockPatient';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

export function DownloadReports() {
  return (
    <GlassCard>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Download reports</h2>
          <p className="mt-1 text-sm text-slate-500">Share these with your doctor or keep a private copy.</p>
        </div>
        <LockKeyhole className="text-blue-600" size={22} />
      </div>
      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white/70 p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={19} />
              </div>
              <div>
                <p className="font-semibold text-slate-950">{report.title}</p>
                <p className="text-xs text-slate-500">{report.date}</p>
              </div>
            </div>
            <Button variant="ghost" className="h-10 min-h-10 w-10 rounded-xl p-0" aria-label={`Download ${report.id}`}>
              <Download size={18} />
            </Button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
