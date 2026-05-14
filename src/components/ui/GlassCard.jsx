import { motion } from 'framer-motion';
import { cn } from '../../utils/classNames';

export function GlassCard({ children, className, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-[0_24px_80px_rgba(37,99,235,0.10)] backdrop-blur-2xl',
        className,
      )}
    >
      {children}
    </motion.section>
  );
}
