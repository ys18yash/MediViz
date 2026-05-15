import { useRef, useState } from 'react';
import { FileUp, Loader2, Upload } from 'lucide-react';
import { ingestReport } from '../../engine/reportStore';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

export function ReportUploadPanel({ patientId, onUploaded }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function onFileSelected(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage('');
    try {
      const result = await ingestReport(patientId, file);
      onUploaded(result.history);
      setMessage(
        result.report.comparison.baseline
          ? 'First report stored as baseline history.'
          : 'New report compared with previous history and timeline updated.',
      );
    } catch (error) {
      setMessage(error?.message || 'Unable to process this report.');
    } finally {
      setLoading(false);
      event.target.value = '';
    }
  }

  return (
    <GlassCard>
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <Upload size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Upload report for comparison</h2>
          <p className="text-sm text-slate-500">Supports image or PDF. Patient ID: {patientId}</p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={onFileSelected}
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => inputRef.current?.click()} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : <FileUp size={18} />}
          {loading ? 'Processing report' : 'Upload image or PDF'}
        </Button>
      </div>
      {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
    </GlassCard>
  );
}
