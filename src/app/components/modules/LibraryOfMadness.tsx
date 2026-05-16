import { useState } from 'react';
import { motion } from 'motion/react';
import { useViewMode } from '../../context/ViewModeContext';
import { BookshelfItem } from '../interactive/BookshelfItem';
import { SanityCheckCard } from '../interactive/SanityCheckCard';
import booksData from '../../../data/chivalric_books.json';
import { Flame, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';

interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  coverColor: string;
  literaryInfluence: string;
  realWorldConsequence: string;
}

export function LibraryOfMadness() {
  const { mode } = useViewMode();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const books = booksData.books as Book[];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/">
            <Button variant="ghost" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className={`w-8 h-8 ${mode === 'truth' ? 'text-blood-red' : 'text-romance-rose'}`} />
            <h1 className="text-5xl md:text-6xl">The Library of Madness</h1>
            <Flame className={`w-8 h-8 ${mode === 'truth' ? 'text-blood-red' : 'text-romance-rose'}`} />
          </div>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            {mode === 'truth'
              ? 'The books of chivalry that corrupted Don Quixote\'s mind—romantic fantasies in an age of harsh imperial reality'
              : 'The glorious tales that inspired a hero to dream beyond the mundane world of merchants and peasants'}
          </p>
        </motion.div>

        {/* Quote from Don Quixote */}
        <motion.blockquote
          className="text-center italic text-lg mb-12 max-w-2xl mx-auto p-6 bg-muted/30 rounded-lg border-l-4 border-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="mb-2">
            "...his brain dried up and he went completely out of his mind."
          </p>
          <footer className="text-sm opacity-70">— Don Quixote, Part I, Chapter 1</footer>
        </motion.blockquote>

        {/* Bookshelf Description */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-muted-foreground">
            Click any book to trigger a <span className="font-medium text-accent">Sanity Check</span>
          </p>
        </motion.div>

        {/* The Bookshelf */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Shelf Background */}
          <div className={`relative p-8 rounded-xl ${
            mode === 'truth'
              ? 'bg-gradient-to-b from-woodcut-black/10 to-dusty-ochre/20'
              : 'bg-gradient-to-b from-enchantment-purple/10 to-knight-azure/20'
          }`}>
            {/* Wooden Shelf Effect */}
            <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-b from-transparent to-stone-gray/30 rounded-b-xl" />

            {/* Books Grid */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {books.map((book, index) => (
                <BookshelfItem
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  coverColor={book.coverColor}
                  onClick={() => setSelectedBook(book)}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Decorative Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/10 blur-xl rounded-full" />
        </motion.div>

        {/* Context Section */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 bg-card rounded-xl border">
            <h2 className="text-2xl mb-4">
              {mode === 'truth' ? 'The Inquisition of the Books' : 'The Examination of Dreams'}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                In Chapter 6 of Don Quixote, the priest and the barber conduct an "inquisition" of Quixote's
                library while he sleeps. They examine each book of chivalry, debating which deserve to be
                burned and which might be spared.
              </p>
              <p>
                {mode === 'truth'
                  ? 'This scene mirrors the Spanish Inquisition\'s book burnings—Cervantes transforms religious censorship into literary criticism. Just as the Inquisition sought to purge heretical ideas, the priest tries to cure Quixote by destroying the source of his delusions.'
                  : 'Yet even as they condemn these books, the priest and barber cannot help but admire certain works. They recognize the power of stories to transport us beyond mundane reality—the very reason Quixote fell in love with them.'}
              </p>
              <p className="italic">
                Each book here represents both literary influence and historical consequence—the dual
                lens through which we must view Don Quixote's world.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sanity Check Modal */}
      {selectedBook && (
        <SanityCheckCard
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          bookTitle={selectedBook.title}
          author={selectedBook.author}
          year={selectedBook.year}
          literaryInfluence={selectedBook.literaryInfluence}
          realWorldConsequence={selectedBook.realWorldConsequence}
        />
      )}
    </div>
  );
}
