import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useViewMode } from '../../context/ViewModeContext';
import { motion } from 'motion/react';
import { AlertTriangle, BookOpen, Gavel, HelpCircle, Scale } from 'lucide-react';

interface SanityCheckCardProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  author: string;
  year: string;
  verdict: string;
  chapterVerdict: string;
  dangerLevel: number;
  literaryInfluence: string;
  realWorldConsequence: string;
  readingQuestion: string;
  sourceNote: string;
}

export function SanityCheckCard({
  isOpen,
  onClose,
  bookTitle,
  author,
  year,
  verdict,
  chapterVerdict,
  dangerLevel,
  literaryInfluence,
  realWorldConsequence,
  readingQuestion,
  sourceNote,
}: SanityCheckCardProps) {
  const { mode } = useViewMode();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Gavel className="h-5 w-5" />
            <span className="text-sm font-semibold">Library trial</span>
          </div>
          <DialogTitle className="pr-8 text-3xl">{bookTitle}</DialogTitle>
          <DialogDescription>
            {author} · {year}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 grid gap-5">
          <motion.div
            className="rounded-lg border bg-primary/10 p-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary">Chapter 6 verdict</p>
                <p className="mt-2 text-2xl font-semibold">{verdict}</p>
              </div>
              <div className="min-w-48">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Reading risk</span>
                  <span>{dangerLevel}%</span>
                </div>
                <div className="h-2 rounded-sm bg-background">
                  <div
                    className="h-2 rounded-sm bg-primary"
                    style={{ width: `${Math.min(100, Math.max(0, dangerLevel))}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">{chapterVerdict}</p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            <motion.section
              className="rounded-lg border bg-card p-5"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08, duration: 0.3 }}
            >
              <div className="mb-3 flex items-center gap-2 text-primary">
                <BookOpen className="h-5 w-5" />
                <h3 className="text-xl font-semibold">What the book promised</h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">{literaryInfluence}</p>
            </motion.section>

            <motion.section
              className="rounded-lg border bg-card p-5"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.16, duration: 0.3 }}
            >
              <div className="mb-3 flex items-center gap-2 text-accent">
                <Scale className="h-5 w-5" />
                <h3 className="text-xl font-semibold">What Cervantes does with it</h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">{realWorldConsequence}</p>
            </motion.section>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_0.85fr]">
            <div className="rounded-lg border bg-background p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <HelpCircle className="h-4 w-4" />
                Reading question
              </p>
              <p className="leading-relaxed">{readingQuestion}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                Fact note
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {mode === 'truth' ? sourceNote : 'Romance mode keeps the interpretive play, but this note flags what the factual anchor is.'}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
