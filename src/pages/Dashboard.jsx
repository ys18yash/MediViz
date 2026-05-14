import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { reports as fallbackReports } from '../data/mockPatient';
import { fetchPatientReports, startReportAnalysis } from '../services/api';
import { useRealtimeEvents } from '../hooks/useRealtimeEvents';
import { BeforeAfter } from '../components/dashboard/BeforeAfter';
import { CurrentReport } from '../components/dashboard/CurrentReport';
import { DownloadReports } from '../components/dashboard/DownloadReports';
import { InsightPanel } from '../components/dashboard/InsightPanel';
import { OrganStatus } from '../components/dashboard/OrganStatus';
import { PredictionModule } from '../components/dashboard/PredictionModule';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RealtimeStatus } from '../components/dashboard/RealtimeStatus';
import { SkeletonLoader } from '../components/dashboard/SkeletonLoader';
import { Timeline } from '../components/dashboard/Timeline';
import { TopBar } from '../components/dashboard/TopBar';
import { SymptomBars } from '../components/visuals/SymptomBars';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionHeader } from '../components/ui/SectionHeader';

export function Dashboard({ patient }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analysisPulse, setAnalysisPulse] = useState(false);
  const realtime = useRealtimeEvents(true);

  useEffect(() => {
    fetchPatientReports().then((items) => {
      setReports(items);
      setLoading(false);
    });
  }, []);

  async function handleStartAnalysis() {
    setAnalysisPulse(true);
    await startReportAnalysis();
    window.setTimeout(() => setAnalysisPulse(false), 1700);
  }

  const latest = reports[0] || fallbackReports[0];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_44%,#f3f9ff_100%)] text-slate-900">
      <TopBar patient={patient} onDownload={() => {}} />
      {loading ? (
        <SkeletonLoader />
      ) : (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid gap-5 lg:grid-cols-[1fr_340px]"
          >
            <div>
              <p className="text-sm font-semibold text-blue-700">Good afternoon, {patient.name}</p>
              <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
                Your latest report is ready, and the trend looks reassuring.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                This view simplifies scan results into visual signals, plain-language insights,
                and questions you can bring to your next appointment.
              </p>
            </div>
            <RealtimeStatus event={analysisPulse ? { progress: 58, message: 'Analysis started on local backend' } : realtime} />
          </motion.div>

          <CurrentReport report={latest} realtime={realtime} onStartAnalysis={handleStartAnalysis} />

          <section className="py-8">
            <SectionHeader
              eyebrow="Report visualization"
              title="What changed in simple terms"
              text="Each visualization is designed for quick understanding, not medical overload."
              action={
                <Button variant="secondary">
                  <Download size={17} /> Export summary
                </Button>
              }
            />
            <div className="grid gap-5 lg:grid-cols-[0.98fr_1.02fr]">
              <OrganStatus />
              <BeforeAfter report={latest} />
            </div>
          </section>

          <section className="grid gap-5 py-2 lg:grid-cols-[0.9fr_1.1fr]">
            <InsightPanel report={latest} />
            <PredictionModule />
          </section>

          <section className="grid gap-5 py-6 lg:grid-cols-[0.95fr_1.05fr]">
            <GlassCard>
              <h2 className="mb-2 text-2xl font-semibold text-slate-950">Symptom progression</h2>
              <p className="mb-6 text-sm leading-6 text-slate-600">
                Current symptoms are shown against your previous report so change is easier to see.
              </p>
              <SymptomBars />
            </GlassCard>
            <Timeline />
          </section>

          <section className="grid gap-5 py-6 lg:grid-cols-[0.92fr_1.08fr]">
            <QuickActions />
            <DownloadReports />
          </section>
        </main>
      )}
    </div>
  );
}
