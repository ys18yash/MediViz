import { motion } from 'framer-motion';
import { symptoms } from '../../data/mockPatient';

export function SymptomBars() {
  return (
    <div className="space-y-4">
      {symptoms.map((item, index) => (
        <div key={item.name}>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">{item.name}</span>
            <span className="text-slate-500">{item.current}% now</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="absolute inset-y-0 left-0 rounded-full bg-slate-200" style={{ width: `${item.previous}%` }} />
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
              initial={{ width: 0 }}
              animate={{ width: `${item.current}%` }}
              transition={{ duration: 0.9, delay: index * 0.08 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
