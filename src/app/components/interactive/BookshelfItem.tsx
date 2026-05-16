import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

interface BookshelfItemProps {
  title: string;
  author: string;
  coverColor: string;
  verdict: string;
  dangerLevel: number;
  onClick: () => void;
  index: number;
}

export function BookshelfItem({
  title,
  author,
  coverColor,
  verdict,
  dangerLevel,
  onClick,
  index,
}: BookshelfItemProps) {
  return (
    <motion.button
      type="button"
      className="group relative flex min-h-64 w-16 flex-col items-center justify-end"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      aria-label={`${title} by ${author}`}
    >
      <div
        className="relative h-60 w-14 overflow-hidden rounded-sm border border-black/20 shadow-lg transition duration-300 group-hover:shadow-2xl"
        style={{
          background: `linear-gradient(90deg, ${coverColor}cc 0%, ${coverColor} 42%, ${coverColor}dd 100%)`,
        }}
      >
        <div className="absolute inset-y-0 left-1 w-px bg-white/25" />
        <div className="absolute inset-y-0 right-2 w-px bg-black/20" />
        <div className="absolute left-0 right-0 top-4 h-px bg-white/25" />
        <div className="absolute bottom-8 left-0 right-0 h-px bg-white/25" />

        <div className="absolute inset-0 flex items-center justify-center px-2">
          <p
            className="max-h-48 overflow-hidden text-center text-sm font-semibold leading-tight text-white"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              textShadow: '0 1px 2px rgba(0,0,0,0.45)',
            }}
          >
            {title}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-1">
          <div className="h-1 rounded-sm bg-white/20">
            <div
              className="h-1 rounded-sm bg-white"
              style={{ width: `${Math.min(100, Math.max(0, dangerLevel))}%` }}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 w-56 -translate-x-1/2 rounded-lg border bg-card p-3 text-left opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="mb-2 flex items-center gap-2 text-primary">
          <BookOpen className="h-4 w-4" />
          <p className="text-sm font-semibold">{verdict}</p>
        </div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{author}</p>
      </div>
    </motion.button>
  );
}
