import { motion } from 'framer-motion';
import { cn } from '../../utils/classNames';

export function Button({ children, variant = 'primary', className, ...props }) {
  const styles = {
    primary:
      'bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] hover:bg-blue-950',
    secondary:
      'border border-blue-100 bg-white/80 text-slate-800 hover:border-blue-200 hover:bg-blue-50',
    ghost: 'text-slate-600 hover:bg-blue-50 hover:text-blue-700',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60',
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
