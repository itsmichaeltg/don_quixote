import { useViewMode } from '../../context/ViewModeContext';
import { Switch } from '../ui/switch';
import { BookOpen, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export function ModeToggle() {
  const { mode, toggleMode } = useViewMode();

  return (
    <motion.div
      className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-card/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        <span className="font-medium">Truth</span>
      </div>

      <Switch
        checked={mode === 'dare'}
        onCheckedChange={toggleMode}
        aria-label="Toggle between Truth and Dare modes"
      />

      <div className="flex items-center gap-2">
        <span className="font-medium">Dare</span>
        <Shield className="w-5 h-5" />
      </div>
    </motion.div>
  );
}
