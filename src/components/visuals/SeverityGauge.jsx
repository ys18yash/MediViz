import { motion } from 'framer-motion';

export function SeverityGauge({ value }) {
  const angle = -105 + (value / 100) * 210;

  return (
    <div className="relative mx-auto flex aspect-[1.45] w-full max-w-[360px] items-end justify-center overflow-hidden">
      <svg viewBox="0 0 260 160" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="gauge" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="48%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path
          d="M35 130 A95 95 0 0 1 225 130"
          fill="none"
          stroke="#e2e8f0"
          strokeLinecap="round"
          strokeWidth="20"
        />
        <motion.path
          d="M35 130 A95 95 0 0 1 225 130"
          fill="none"
          stroke="url(#gauge)"
          strokeLinecap="round"
          strokeWidth="20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value / 100 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <motion.div
        className="absolute bottom-[18px] h-[72px] w-[5px] origin-bottom rounded-full bg-slate-950 shadow-lg"
        initial={{ rotate: -105 }}
        animate={{ rotate: angle }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <div className="relative z-10 mb-1 rounded-3xl bg-white/80 px-6 py-4 text-center shadow-sm backdrop-blur">
        <p className="text-5xl font-semibold text-slate-950">{value}</p>
        <p className="text-sm font-medium text-slate-500">Mild to moderate</p>
      </div>
    </div>
  );
}
