import { useViewMode } from '../../context/ViewModeContext';
import { Switch } from '../ui/switch';
import { BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function ModeToggle() {
  const { mode, toggleMode } = useViewMode();

  return (
    <motion.div
      className="fixed right-4 top-4 z-50 flex max-w-[calc(100vw-2rem)] items-center justify-center gap-3 rounded-lg border border-border bg-card/90 px-3 py-2 shadow-lg backdrop-blur-sm sm:right-6 sm:top-6 sm:px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`flex items-center gap-2 ${mode === 'truth' ? 'text-foreground' : 'text-muted-foreground'}`}>
        <BookOpen className="h-4 w-4" />
        <span className="hidden text-sm font-medium sm:inline">Reality</span>
      </div>

      <Switch
        checked={mode === 'dare'}
        onCheckedChange={toggleMode}
        aria-label="Toggle between reality and romance modes"
      />

      <div className={`flex items-center gap-2 ${mode === 'dare' ? 'text-foreground' : 'text-muted-foreground'}`}>
        <span className="hidden text-sm font-medium sm:inline">Romance</span>
        <Sparkles className="h-4 w-4" />
      </div>
    </motion.div>
  );
}
