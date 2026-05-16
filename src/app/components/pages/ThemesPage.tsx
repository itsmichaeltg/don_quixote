import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemesCard } from '../interactive/ThemesCard';

const sources = [
  {
    label: 'Don Quixote, Part I, Chapters 6-8',
    href: 'https://www.gutenberg.org/files/5921/old/orig5921-h/p3.htm',
  },
  {
    label: 'Library of Congress: Don Quixote first edition',
    href: 'https://www.loc.gov/item/2021666762/',
  },
  {
    label: 'Britannica: Miguel de Cervantes',
    href: 'https://www.britannica.com/biography/Miguel-de-Cervantes',
  },
];

export function ThemesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button asChild variant="ghost" size="lg" className="mb-8 gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </Button>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]"
        >
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <BookOpen className="h-4 w-4" />
              Theme
            </p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-6xl">The tilt of reality</h1>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Don Quixote is not a simple argument between madness and sanity. It is a pressure test for perception, class, justice, authorship, and the strange social power of stories.
          </p>
        </motion.header>

        <ThemesCard />

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
