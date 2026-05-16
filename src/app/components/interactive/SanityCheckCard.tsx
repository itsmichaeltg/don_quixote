import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useViewMode } from '../../context/ViewModeContext';
import { motion } from 'motion/react';
import { BookOpen, AlertTriangle } from 'lucide-react';

interface SanityCheckCardProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  author: string;
  year: string;
  literaryInfluence: string;
  realWorldConsequence: string;
}

export function SanityCheckCard({
  isOpen,
  onClose,
  bookTitle,
  author,
  year,
  literaryInfluence,
  realWorldConsequence
}: SanityCheckCardProps) {
  const { mode } = useViewMode();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl mb-2">{bookTitle}</DialogTitle>
          <p className="text-muted-foreground">
            {author} ({year})
          </p>
        </DialogHeader>

        <div className="mt-6">
          <div className="text-center mb-6">
            <motion.div
              className="inline-flex items-center gap-2 text-2xl font-medium"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AlertTriangle className="w-6 h-6 text-accent" />
              <span>Sanity Check</span>
              <AlertTriangle className="w-6 h-6 text-accent" />
            </motion.div>
          </div>

          {/* Split View */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Side - Literary Influence */}
            <motion.div
              className="space-y-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${mode === 'truth' ? 'bg-dusty-ochre/20' : 'bg-knight-azure/20'}`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium">Literary Influence</h3>
              </div>
              <div className="p-6 bg-muted/50 rounded-lg border-l-4 border-primary">
                <p className="leading-relaxed">{literaryInfluence}</p>
              </div>
            </motion.div>

            {/* Right Side - Real World Consequence */}
            <motion.div
              className="space-y-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${mode === 'truth' ? 'bg-blood-red/20' : 'bg-romance-rose/20'}`}>
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium">Real-World Consequence</h3>
              </div>
              <div className="p-6 bg-muted/50 rounded-lg border-l-4 border-accent">
                <p className="leading-relaxed">{realWorldConsequence}</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Insight */}
          <motion.div
            className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <p className="text-sm italic text-center">
              {mode === 'truth'
                ? 'The chivalric ideal versus the harsh reality of empire'
                : 'When dreams collide with the weight of history'}
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
