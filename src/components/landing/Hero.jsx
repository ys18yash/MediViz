import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, HeartPulse, QrCode, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

const trust = [
  ['Private by design', ShieldCheck],
  ['Plain-language reports', Sparkles],
  ['Care-team ready', BadgeCheck],
];

export function Hero({ onLogin, onQr }) {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(191,219,254,0.9),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(204,251,241,0.75),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#ffffff_60%)]" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <HeartPulse size={23} />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-950">MediViz</p>
            <p className="text-xs font-medium text-slate-500">Patient clarity platform</p>
          </div>
        </div>
        <Button variant="ghost" onClick={onLogin}>
          Patient login
        </Button>
      </nav>

      <div className="mx-auto grid max-w-7xl items-center gap-10 py-10 lg:grid-cols-[1.03fr_0.97fr] lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur">
            <Sparkles size={16} />
            AI support for medical report understanding
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
            Understand your scan report without the fear.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            MediViz turns complex medical scans into calm visual summaries, guided insights,
            progress trends, and simple next steps you can discuss with your doctor.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={onLogin}>
              Login with Patient ID <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" onClick={onQr}>
              <QrCode size={18} /> Scan QR Code
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trust.map(([label, Icon]) => (
              <div key={label} className="flex items-center gap-2 rounded-2xl border border-white bg-white/70 px-4 py-3 text-sm font-medium text-slate-600 shadow-sm">
                <Icon className="text-blue-600" size={18} />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[38px] bg-gradient-to-br from-blue-200/70 via-white to-teal-100/80 blur-2xl" />
          <div className="relative overflow-hidden rounded-[34px] border border-white/80 bg-white/70 shadow-[0_34px_90px_rgba(37,99,235,0.18)] backdrop-blur-xl">
            <img
              alt="Calm patient care consultation"
              className="h-[360px] w-full object-cover sm:h-[450px]"
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=80"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-[24px] border border-white/80 bg-white/82 p-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-950">Latest scan clarity</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Mild findings, improving trend, routine follow-up</p>
                </div>
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-green-50 text-lg font-semibold text-green-700">
                  92%
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
