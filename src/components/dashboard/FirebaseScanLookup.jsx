import { useState } from 'react';
import { Database, Loader2, Search, ShieldAlert } from 'lucide-react';
import { fetchScanDataById } from '../../services/firebase';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

function JsonBlock({ data }) {
  return (
    <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export function FirebaseScanLookup() {
  const [scanId, setScanId] = useState('SCAN-LOCAL-0526');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await fetchScanDataById(scanId);
      setResult(data);
    } catch (err) {
      setError(err?.message || 'Unable to fetch scan data from Firebase.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard>
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <Database size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Scan data from Firebase</h2>
          <p className="text-sm text-slate-500">Search by scan ID and view all matched records.</p>
        </div>
      </div>

      <form onSubmit={submit} className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input
          value={scanId}
          onChange={(event) => setScanId(event.target.value)}
          className="h-12 w-full rounded-2xl border border-blue-100 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          placeholder="Enter scan ID"
        />
        <Button className="sm:min-w-40" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={17} />}
          {loading ? 'Fetching' : 'Fetch records'}
        </Button>
      </form>

      {error ? (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
          <p className="flex items-center gap-2 font-semibold">
            <ShieldAlert size={16} /> Request failed
          </p>
          <p className="mt-1">{error}</p>
        </div>
      ) : null}

      {result ? (
        <div className="space-y-4">
          <div className="rounded-2xl bg-blue-50 p-4 text-sm text-blue-900">
            <p className="font-semibold">Scan ID: {result.scanId}</p>
            <p className="mt-1">Total matched records: {result.totalMatches}</p>
          </div>
          {Object.entries(result.collections).map(([name, rows]) => (
            <div key={name} className="rounded-2xl border border-slate-100 bg-white/80 p-4">
              <p className="mb-3 text-sm font-semibold capitalize text-slate-900">
                {name} ({rows.length})
              </p>
              {rows.length > 0 ? (
                <JsonBlock data={rows} />
              ) : (
                <p className="text-sm text-slate-500">No records in this collection for the selected scan ID.</p>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </GlassCard>
  );
}
