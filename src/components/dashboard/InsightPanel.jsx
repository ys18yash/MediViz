import { useEffect, useState } from 'react';
import { ChevronDown, CircleCheck, HeartHandshake, Info, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';

const icons = {
  positive: CircleCheck,
  neutral: Info,
  calm: HeartHandshake,
};

export function InsightPanel({ report }) {
  const [open, setOpen] = useState(report.findings[0]?.label || '');

  useEffect(() => {
    setOpen(report.findings[0]?.label || '');
  }, [report]);

  return (
    <GlassCard>
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <Lightbulb size={21} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">AI insights</h2>
          <p className="text-sm text-slate-500">Simple findings you can review with your doctor.</p>
        </div>
      </div>

      <div className="space-y-3">
        {report.findings.map((item) => {
          const Icon = icons[item.tone] || Info;
          const isOpen = open === item.label;
          return (
            <div key={item.label} className="rounded-2xl border border-slate-100 bg-white/70">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? '' : item.label)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={19} />
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-950">{item.label}</span>
                    <span className="text-sm text-slate-500">{item.status}</span>
                  </span>
                </span>
                <ChevronDown className={`text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} size={19} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 pl-[68px] text-sm leading-6 text-slate-600">{item.detail}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
