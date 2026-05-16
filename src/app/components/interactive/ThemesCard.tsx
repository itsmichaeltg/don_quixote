import { type ChangeEvent, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookMarked,
  Brain,
  ChevronRight,
  Crown,
  Eye,
  Scale,
  Theater,
} from 'lucide-react';

interface ThemeLens {
  id: string;
  title: string;
  icon: typeof Eye;
  passage: string;
  quixote: string;
  sancho: string;
  classroomMove: string;
}

const THEMES: ThemeLens[] = [
  {
    id: 'perception',
    title: 'Reality vs Imagination',
    icon: Eye,
    passage: 'Windmills, inns, flocks, and Dulcinea',
    quixote: 'Don Quixote does not merely mistake objects. He brings a whole literary system to ordinary things, then treats resistance as proof of enchantment.',
    sancho: 'Sancho keeps the ground under the joke. He names what is physically present, but he also learns that facts alone do not end a story people want to believe.',
    classroomMove: 'Read every adventure twice: what is materially there, and what story does each person need it to become?',
  },
  {
    id: 'books',
    title: 'Reading As Possession',
    icon: BookMarked,
    passage: 'The library scrutiny, Part I, Chapter 6',
    quixote: 'Books give Don Quixote a script, a costume, a name, a mission, and a beloved. Literature becomes a technology for remaking the self.',
    sancho: 'Sancho is not bookish, but he is deeply susceptible to promises. The island he wants is its own kind of fiction: practical, comic, and socially revealing.',
    classroomMove: 'Ask what each character is reading, even when no physical book is open.',
  },
  {
    id: 'class',
    title: 'Class, Rank, And Performance',
    icon: Crown,
    passage: 'Hidalgo, squire, innkeepers, dukes',
    quixote: 'A poor hidalgo performs a nobility that the world no longer confirms. His title is both ridiculous and moving because he keeps trying to make honor visible.',
    sancho: 'Sancho’s realism is economic. Food, wages, beatings, and the fantasy of governing an island show how class shapes what counts as common sense.',
    classroomMove: 'Notice who can afford illusion, who must clean up after it, and who profits from staging it.',
  },
  {
    id: 'justice',
    title: 'Justice And Harm',
    icon: Scale,
    passage: 'Andrés, galley slaves, Ricote',
    quixote: 'The knight wants to repair the world through heroic intervention, but good intentions often leave vulnerable people worse off.',
    sancho: 'Sancho senses risk before Don Quixote does. His caution asks whether justice is still justice when it ignores consequences.',
    classroomMove: 'After each rescue, check the result, not only the motive.',
  },
  // {
  //   id: 'metafiction',
  //   title: 'Short Stories as a Teaching Point',
  //   icon: Theater,
  //   passage: 'Part II and the false sequel',
  //   quixote: 'By Part II, Don Quixote knows people have read about him. He begins performing for a reputation already circulating in print.',
  //   sancho: 'Sancho hears his own proverbs, errors, and ambitions reflected back by readers. Fame becomes funny because it does not feed him or protect him.',
  //   classroomMove: 'Treat Part II as a social media problem before social media: identity gets copied, judged, and misused.',
  // },
];

export function ThemesCard() {
  const [lens, setLens] = useState(50);
  const [selectedThemeId, setSelectedThemeId] = useState(THEMES[0].id);

  const selectedTheme = useMemo(
    () => THEMES.find((theme) => theme.id === selectedThemeId) ?? THEMES[0],
    [selectedThemeId],
  );

  const quixoteWeight = 0.65 + ((100 - lens) / 100) * 0.35;
  const sanchoWeight = 0.65 + (lens / 100) * 0.35;
  const LensIcon = selectedTheme.icon;

  const handleLensChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLens(Number(event.currentTarget.value));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="space-y-3">
        {THEMES.map((theme) => {
          const Icon = theme.icon;
          const isActive = selectedTheme.id === theme.id;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setSelectedThemeId(theme.id)}
              className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition ${
                isActive
                  ? 'border-primary bg-primary/15 text-foreground shadow-sm'
                  : 'border-border bg-card/80 text-muted-foreground hover:bg-card'
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{theme.title}</p>
                <p className="mt-1 text-sm">{theme.passage}</p>
              </div>
              <ChevronRight className={`h-4 w-4 shrink-0 transition ${isActive ? 'translate-x-1 text-primary' : ''}`} />
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="rounded-lg border bg-card p-5 shadow-xl"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <LensIcon className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-primary">Theme lens</p>
            <h2 className="mt-2 text-4xl font-semibold">{selectedTheme.title}</h2>
          </div>
          <div className="rounded-lg border bg-background px-4 py-3 text-sm text-muted-foreground">
            {selectedTheme.passage}
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Don Quixote
            </span>
            <span>Sancho Panza</span>
          </div>
          <input
            className="dq-range"
            type="range"
            min="0"
            max="100"
            value={lens}
            onChange={handleLensChange}
            aria-label="Perspective balance between Don Quixote and Sancho Panza"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTheme.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <div
              className="rounded-lg border border-primary/30 bg-background p-5 transition"
              style={{ opacity: quixoteWeight }}
            >
              <p className="mb-3 text-sm font-semibold text-primary">Quixote’s lens</p>
              <p className="leading-relaxed text-muted-foreground">{selectedTheme.quixote}</p>
            </div>
            <div
              className="rounded-lg border border-accent/30 bg-background p-5 transition"
              style={{ opacity: sanchoWeight }}
            >
              <p className="mb-3 text-sm font-semibold text-accent">Sancho’s lens</p>
              <p className="leading-relaxed text-muted-foreground">{selectedTheme.sancho}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* <div className="mt-5 rounded-lg border bg-primary/10 p-5">
          <p className="text-sm font-semibold text-primary">Classroom move</p>
          <p className="mt-2 leading-relaxed">{selectedTheme.classroomMove}</p>
        </div> */}
      </motion.div>
    </div>
  );
}
