import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Compass,
  Library,
  MapPinned,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useViewMode } from '../../context/ViewModeContext';
import heroImage from '../../../imports/windmills-hero.jpg';

const modules = [
  {
    id: 'themes',
    icon: Sparkles,
    label: 'Themes',
    title: 'Theme Lens',
    description: 'Reality, imagination, class, authorship, and the uneasy joke of being sane.',
    path: '/themes',
    prompt: 'Track how the same event can be comedy, critique, and heartbreak at once.',
  },
  {
    id: 'journey',
    icon: MapPinned,
    label: 'Journey',
    title: 'The Three Sallies',
    description: 'Follow the route from a nameless village through La Mancha and finally Barcelona.',
    path: '/journey',
    prompt: 'Watch places change meaning when Sancho, strangers, and readers join the performance.',
  },
  {
    id: 'timeline',
    icon: CalendarDays,
    label: 'Timeline',
    title: 'History Around the Novel',
    description: 'Place Cervantes between Lepanto, inflation, censorship, publication, and exile.',
    path: '/timeline',
    prompt: 'Use history as pressure, not trivia: what does the age make possible or absurd?',
  },
  {
    id: 'books',
    icon: Library,
    label: 'Books',
    title: 'The Library Trial',
    description: 'Open the books that shaped Don Quixote and see which ones survive Chapter 6.',
    path: '/books',
    prompt: 'Ask why Cervantes burns, saves, jokes about, or quarantines different fantasies.',
  },
];

const anchorFacts = [
  {
    label: '1605 / 1615',
    text: 'Don Quixote appeared in two parts, a decade apart.',
  },
  {
    label: '1571',
    text: 'Cervantes fought at Lepanto and permanently lost the use of his left hand.',
  },
  {
    label: 'Chapter 6',
    text: 'The priest and barber judge real chivalric books from Don Quixote’s library.',
  },
  {
    label: 'Chapter 8',
    text: 'The windmills are not named by town; Campo de Criptana is a strong later tradition.',
  },
];

const sourceLinks = [
  {
    label: 'Britannica: Cervantes',
    href: 'https://www.britannica.com/biography/Miguel-de-Cervantes',
  },
  {
    label: 'Library of Congress: 1605 edition',
    href: 'https://www.loc.gov/item/2021666762/',
  },
  {
    label: 'Project Gutenberg: Chapters 6-8',
    href: 'https://www.gutenberg.org/files/5921/old/orig5921-h/p3.htm',
  },
  {
    label: 'Castilla-La Mancha tourism: Campo de Criptana',
    href: 'https://www.turismocastillalamancha.es/es/destinos/encanto-rural/ciudad-real/campo-de-criptana',
  },
];

export function LandingPage() {
  const { mode, setMode } = useViewMode();
  const [activeModule, setActiveModule] = useState(modules[0]);

  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative flex min-h-[88vh] items-center px-6 pb-12 pt-28 sm:pt-32">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Windmills in La Mancha"
            className="h-full w-full scale-105 object-cover object-center opacity-95 blur-[1px] brightness-75"
          />
          <div className={`absolute inset-0 ${
            mode === 'truth'
              ? 'bg-[linear-gradient(90deg,rgba(23,20,17,0.72),rgba(139,47,43,0.24),rgba(242,231,210,0.58))]'
              : 'bg-[linear-gradient(90deg,rgba(22,35,31,0.76),rgba(40,113,95,0.36),rgba(112,80,130,0.42))]'
          }`}
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-white"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/30 bg-black/25 px-3 py-2 text-sm backdrop-blur-sm">
              <BookOpen className="h-4 w-4" />
              Reading lab for first-time knights and skeptical squires
            </div>
            <h1 className="text-5xl font-semibold leading-none sm:text-7xl lg:text-8xl">
              Don Quixote
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">
              A playable guide to Cervantes’s strange machine: books create a knight, roads test him, history presses in, and the joke keeps changing sides.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link to="/journey">
                  <Compass className="h-5 w-5" />
                  Start The Journey
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                onClick={() => setMode(mode === 'truth' ? 'dare' : 'truth')}
              >
                <Sparkles className="h-5 w-5" />
                Shift The Lens
              </Button>
            </div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="rounded-lg border border-white/20 bg-black/35 p-4 text-white shadow-2xl backdrop-blur-md"
          >
            <div className="grid grid-cols-2 gap-2">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule.id === module.id;

                return (
                  <button
                    key={module.id}
                    type="button"
                    onMouseEnter={() => setActiveModule(module)}
                    onFocus={() => setActiveModule(module)}
                    onClick={() => setActiveModule(module)}
                    className={`flex min-h-20 flex-col items-start justify-between rounded-lg border p-3 text-left transition ${
                      isActive
                        ? 'border-primary bg-primary/25 text-white'
                        : 'border-white/20 bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-base font-semibold">{module.label}</span>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 rounded-lg border border-white/15 bg-white/10 p-4"
            >
              <p className="text-sm text-white/60">Current reading move</p>
              <h2 className="mt-2 text-3xl font-semibold">{activeModule.title}</h2>
              <p className="mt-3 leading-relaxed text-white/80">{activeModule.prompt}</p>
              <Button asChild variant="outline" className="mt-4 gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Link to={activeModule.path}>
                  Open {activeModule.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div> */}
        </div>
        
      </section>

      <section className="border-y border-border/70 bg-background/95 px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
              >
                <Link to={module.path} className="block h-full">
                  <Card className="h-full transition hover:-translate-y-1 hover:shadow-xl">
                    <CardHeader>
                      <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-2xl">{module.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-center gap-3 text-sm">
          {sourceLinks.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border bg-card px-3 py-2 text-muted-foreground transition hover:text-foreground"
            >
              {source.label}
            </a>
          ))}
        </div>
      </section>

      {/* <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold text-primary">Fact-checked anchors</p>
            <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Keep these in your pocket while reading.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              The site separates hard facts from strong traditions and interpretation. That matters because Don Quixote is basically a brilliant trap for people who confuse a good story with proof.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {anchorFacts.map((fact) => (
              <div key={fact.label} className="rounded-lg border bg-card p-5 shadow-sm">
                <p className="text-2xl font-semibold text-primary">{fact.label}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-3 text-sm">
          {sourceLinks.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border bg-card px-3 py-2 text-muted-foreground transition hover:text-foreground"
            >
              {source.label}
            </a>
          ))}
        </div>
      </section> */}
      
       
    </main>
  );
}
