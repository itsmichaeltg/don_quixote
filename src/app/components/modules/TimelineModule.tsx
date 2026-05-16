import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Coins,
  Cross,
  ExternalLink,
  Feather,
  ScrollText,
  Shield,
  Swords,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import timelineData from '../../../data/timeline_events.json';
import { useViewMode } from '../../context/ViewModeContext';

interface TimelineEvent {
  id: string;
  year: number;
  displayDate: string;
  title: string;
  category: 'literature' | 'politics' | 'war' | 'economy' | 'life';
  truthDescription: string;
  dareDescription: string;
  significance: string;
}

const categoryConfig = {
  all: { label: 'All', icon: CalendarDays, color: '#5F665F' },
  literature: { label: 'Literature', icon: BookOpen, color: '#28715F' },
  politics: { label: 'Power', icon: Shield, color: '#B88A2C' },
  war: { label: 'War', icon: Swords, color: '#8B2F2B' },
  life: { label: 'Cervantes', icon: Feather, color: '#27587A' },
};

type CategoryKey = keyof typeof categoryConfig;

const sources = [
  {
    label: 'Britannica: Cervantes',
    href: 'https://www.britannica.com/biography/Miguel-de-Cervantes',
  },
  {
    label: 'Britannica: Spanish Armada',
    href: 'https://www.britannica.com/topic/Armada-Spanish-naval-fleet',
  },
  {
    label: 'Britannica: Moriscos',
    href: 'https://www.britannica.com/topic/Morisco',
  },
  {
    label: 'Library of Congress: Don Quixote',
    href: 'https://www.loc.gov/item/2021666762/',
  },
];

export function TimelineModule() {
  const { mode } = useViewMode();
  const events = timelineData.events as TimelineEvent[];
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [selectedId, setSelectedId] = useState('part-one');

  const filteredEvents = useMemo(() => {
    const sorted = [...events].sort((a, b) => a.year - b.year);
    return activeCategory === 'all'
      ? sorted
      : sorted.filter((event) => event.category === activeCategory);
  }, [activeCategory, events]);

  const selectedEvent = useMemo(
    () => filteredEvents.find((event) => event.id === selectedId) ?? filteredEvents[0] ?? events[0],
    [events, filteredEvents, selectedId],
  );

  const selectedConfig = categoryConfig[selectedEvent.category];
  const SelectedIcon = selectedConfig.icon;

  return (
    <main className="min-h-screen overflow-x-hidden px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Button asChild variant="ghost" size="lg" className="mb-8 gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </Button>

        <motion.header
          className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <CalendarDays className="h-4 w-4" />
              Timeline
            </p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-6xl">The century that reads him back.</h1>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {/* This is not a “history explains everything” chart. It is a pressure map: war, money, censorship, print, and exile create the world in which Don Quixote’s fantasy becomes funny, painful, and modern. */}
            This is a timeline of the major events that occured throught the creation of and the initial release of the novel. These events contexualize 
          </p>
        </motion.header>

        <section className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {(Object.keys(categoryConfig) as CategoryKey[]).map((category) => {
            const config = categoryConfig[category];
            const Icon = config.icon;
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-left transition ${
                  isActive
                    ? 'border-primary bg-primary/15 text-foreground'
                    : 'bg-card text-muted-foreground hover:bg-card/80'
                }`}
              >
                <Icon className="h-4 w-4" style={{ color: config.color }} />
                <span className="font-semibold">{config.label}</span>
              </button>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
          <div className="relative rounded-lg border bg-card p-4 shadow-xl">
            <div className="absolute bottom-0 left-10 top-0 hidden w-px bg-border md:block" />
            <div className="space-y-3">
              {filteredEvents.map((event) => {
                const config = categoryConfig[event.category];
                const Icon = config.icon;
                const isSelected = selectedEvent.id === event.id;

                return (
                  <motion.button
                    key={event.id}
                    type="button"
                    onClick={() => setSelectedId(event.id)}
                    className={`relative grid w-full gap-3 rounded-lg border p-4 text-left transition md:grid-cols-[5rem_1fr] ${
                      isSelected
                        ? 'border-primary bg-primary/15 shadow-sm'
                        : 'bg-background hover:bg-muted/50'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center gap-3 md:block">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-sm" style={{ backgroundColor: config.color }}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="mt-2 block font-semibold text-primary md:text-lg">{event.displayDate}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{event.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {mode === 'truth' ? event.truthDescription : event.dareDescription}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={selectedEvent.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.25 }}
              className="rounded-lg border bg-card p-5 shadow-xl"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Badge className="mb-3" style={{ backgroundColor: selectedConfig.color }}>
                    {selectedConfig.label}
                  </Badge>
                  <h2 className="text-4xl font-semibold">{selectedEvent.title}</h2>
                  <p className="mt-2 text-lg font-semibold text-primary">{selectedEvent.displayDate}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <SelectedIcon className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 rounded-lg border bg-background p-5">
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                  <ScrollText className="h-4 w-4" />
                  {mode === 'truth' ? 'Historical pressure' : 'Romance pressure'}
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  {mode === 'truth' ? selectedEvent.truthDescription : selectedEvent.dareDescription}
                </p>
              </div>

              <div className="mt-4 rounded-lg border bg-background p-5">
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent">
                  <Cross className="h-4 w-4" />
                  Other lens
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  {mode === 'truth' ? selectedEvent.dareDescription : selectedEvent.truthDescription}
                </p>
              </div>

              <div className="mt-4 rounded-lg border bg-primary/10 p-5">
                <p className="text-sm font-semibold text-primary">Why it matters for Don Quixote</p>
                <p className="mt-2 leading-relaxed">{selectedEvent.significance}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </section>

        <section className="mt-12 rounded-lg border bg-card p-5">
          <p className="text-sm font-semibold text-primary">Source trail</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              >
                {source.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
