import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  Flame,
  Gavel,
  Library,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../ui/button';
import { BookshelfItem } from '../interactive/BookshelfItem';
import { SanityCheckCard } from '../interactive/SanityCheckCard';
import booksData from '../../../data/chivalric_books.json';
import { useViewMode } from '../../context/ViewModeContext';

interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  coverColor: string;
  verdict: string;
  dangerLevel: number;
  chapterVerdict: string;
  literaryInfluence: string;
  realWorldConsequence: string;
  readingQuestion: string;
  sourceNote: string;
}

const verdictFilters = [
  { id: 'all', label: 'All books', icon: Library },
  { id: 'spared', label: 'Spared', icon: ShieldCheck },
  { id: 'burned', label: 'Burned', icon: Flame },
  { id: 'quarantined', label: 'Quarantined', icon: Gavel },
];

const sources = [
  {
    label: 'Part I, Chapter 6',
    href: 'https://www.gutenberg.org/files/5921/old/orig5921-h/p3.htm',
  },
  {
    label: 'Britannica: Amadís de Gaula',
    href: 'https://www.britannica.com/topic/Amadis-of-Gaul',
  },
  {
    label: 'Biblioteca Virtual Miguel de Cervantes: Tirant',
    href: 'https://www.cervantesvirtual.com/obra-visor/tirant-lo-blanc--0/html/',
  },
  {
    label: 'USC Dornsife: California name',
    href: 'https://dornsife.usc.edu/magazine/how-california-got-its-name/',
  },
];

export function LibraryOfMadness() {
  const { mode } = useViewMode();
  const books = booksData.books as Book[];
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredBooks = useMemo(() => {
    if (filter === 'all') return books;
    return books.filter((book) => book.verdict.toLowerCase().includes(filter));
  }, [books, filter]);

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
              <BookOpen className="h-4 w-4" />
              Books
            </p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-6xl">The library trial</h1>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Part I, Chapter 6 is a miniature literary court. The priest and barber judge the books that helped make Don Quixote, and Cervantes turns censorship into comedy, criticism, and confession.
          </p>
        </motion.header>

        <section className="mb-6 flex flex-wrap gap-3">
          {verdictFilters.map((item) => {
            const Icon = item.icon;
            const isActive = filter === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 font-semibold transition ${
                  isActive
                    ? 'border-primary bg-primary/15 text-foreground'
                    : 'bg-card text-muted-foreground hover:bg-card/80'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </section>

        <section className="relative rounded-lg border bg-card p-6 shadow-xl">
          <div className={`absolute inset-x-0 bottom-0 h-5 rounded-b-lg ${
            mode === 'truth' ? 'bg-[linear-gradient(180deg,rgba(23,20,17,0),rgba(23,20,17,0.22))]' : 'bg-[linear-gradient(180deg,rgba(248,241,230,0),rgba(229,184,79,0.2))]'
          }`}
          />
          <div className="relative flex min-h-72 flex-wrap items-end justify-center gap-4 md:gap-5">
            {filteredBooks.map((book, index) => (
              <BookshelfItem
                key={book.id}
                title={book.title}
                author={book.author}
                coverColor={book.coverColor}
                verdict={book.verdict}
                dangerLevel={book.dangerLevel}
                onClick={() => setSelectedBook(book)}
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border bg-card p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Gavel className="h-4 w-4" />
              What got cleaned up
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The bookshelf now separates chapter verdicts from interpretation. It avoids treating every traditional claim as proven fact and keeps Cervantes’s actual joke in view: he saves some fantasies, burns others, and cannot resist judging style.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-5">
              <p className="text-2xl font-semibold text-primary">8</p>
              <p className="mt-2 text-sm text-muted-foreground">real chivalric books in the trial shelf</p>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <p className="text-2xl font-semibold text-primary">3</p>
              <p className="mt-2 text-sm text-muted-foreground">possible outcomes: spared, burned, quarantined</p>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <p className="text-2xl font-semibold text-primary">1</p>
              <p className="mt-2 text-sm text-muted-foreground">question: what should readers do with powerful stories?</p>
            </div>
          </div>
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

      {selectedBook && (
        <SanityCheckCard
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          bookTitle={selectedBook.title}
          author={selectedBook.author}
          year={selectedBook.year}
          verdict={selectedBook.verdict}
          chapterVerdict={selectedBook.chapterVerdict}
          dangerLevel={selectedBook.dangerLevel}
          literaryInfluence={selectedBook.literaryInfluence}
          realWorldConsequence={selectedBook.realWorldConsequence}
          readingQuestion={selectedBook.readingQuestion}
          sourceNote={selectedBook.sourceNote}
        />
      )}
    </main>
  );
}
