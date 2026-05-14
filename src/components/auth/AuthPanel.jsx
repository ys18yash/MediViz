import { useState } from 'react';
import { Camera, Fingerprint, Loader2, QrCode } from 'lucide-react';
import { authenticatePatient } from '../../services/api';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

export function AuthPanel({ mode = 'id', onAuthenticated }) {
  const [activeMode, setActiveMode] = useState(mode);
  const [patientId, setPatientId] = useState('MV-2049-ALYA');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    const session = await authenticatePatient({
      patientId,
      method: activeMode,
    });
    setLoading(false);
    onAuthenticated(session.patient);
  }

  return (
    <GlassCard className="mx-auto max-w-xl p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white">
          <Fingerprint size={22} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Welcome back</h2>
          <p className="text-sm text-slate-500">Open your private report space.</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setActiveMode('id')}
          className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${activeMode === 'id' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}
        >
          Patient ID
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('qr')}
          className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${activeMode === 'qr' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}
        >
          QR Code
        </button>
      </div>

      <form onSubmit={submit}>
        {activeMode === 'id' ? (
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Patient ID</span>
            <input
              value={patientId}
              onChange={(event) => setPatientId(event.target.value)}
              className="mt-2 h-14 w-full rounded-2xl border border-blue-100 bg-white px-4 text-base font-medium text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              placeholder="Enter patient ID"
            />
          </label>
        ) : (
          <div className="rounded-[24px] border border-dashed border-blue-200 bg-blue-50/60 p-6 text-center">
            <div className="mx-auto grid h-32 w-32 place-items-center rounded-[28px] bg-white text-blue-600 shadow-sm">
              <QrCode size={82} />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-700">Point your camera at the secure QR code</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">Demo mode opens your sample report instantly.</p>
          </div>
        )}

        <Button className="mt-6 w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : activeMode === 'qr' ? <Camera size={18} /> : null}
          {loading ? 'Opening securely' : 'Continue to reports'}
        </Button>
      </form>
    </GlassCard>
  );
}
