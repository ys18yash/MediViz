import { Bell, Download, HeartPulse, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export function TopBar({ patient, onDownload }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/76 px-4 py-3 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-100">
            <HeartPulse size={22} />
          </div>
          <div>
            <p className="font-semibold text-slate-950">MediViz</p>
            <p className="hidden text-xs text-slate-500 sm:block">{patient.careTeam}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 md:flex">
            <ShieldCheck size={15} /> Secure session
          </div>
          <Button variant="ghost" className="h-11 min-h-11 w-11 rounded-2xl p-0" aria-label="Notifications">
            <Bell size={19} />
          </Button>
          <Button variant="secondary" className="hidden sm:inline-flex" onClick={onDownload}>
            <Download size={17} /> Download
          </Button>
        </div>
      </div>
    </header>
  );
}
