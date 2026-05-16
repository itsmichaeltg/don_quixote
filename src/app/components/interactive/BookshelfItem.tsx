import { motion } from 'motion/react';
import { useViewMode } from '../../context/ViewModeContext';

interface BookshelfItemProps {
  title: string;
  author: string;
  coverColor: string;
  onClick: () => void;
  index: number;
}

export function BookshelfItem({ title, author, coverColor, onClick, index }: BookshelfItemProps) {
  const { mode } = useViewMode();

  return (
    <motion.div
      className="relative cursor-pointer group perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
    >
      {/* Book Spine */}
      <div
        className="relative h-64 w-14 rounded-sm shadow-lg transition-all duration-300 group-hover:shadow-2xl"
        style={{
          background: `linear-gradient(to right,
            ${coverColor}dd 0%,
            ${coverColor} 50%,
            ${coverColor}cc 100%)`,
          transform: 'rotateY(-2deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Book Title - Vertical */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="text-white font-medium text-sm px-2 text-center"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {title}
          </div>
        </div>

        {/* Decorative Edge Lines */}
        <div className="absolute top-2 left-0 right-0 h-px bg-white/20" />
        <div className="absolute bottom-2 left-0 right-0 h-px bg-white/20" />

        {/* Book Edge Shadow */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1 bg-black/30"
          style={{ transform: 'translateX(-1px)' }}
        />
      </div>

      {/* Hover Tooltip */}
      <motion.div
        className={`absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
          mode === 'truth' ? 'bg-card text-card-foreground' : 'bg-card text-card-foreground'
        }`}
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs opacity-70">{author}</p>
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card" />
      </motion.div>
    </motion.div>
  );
}
