import { motion } from 'motion/react';
import { ThemesCard } from '../interactive/ThemesCard';

export function ThemesPage() {
  return (
    <div className="min-h-screen py-20 px-6" style={{ backgroundColor: '#FDFBF7' }}>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <motion.h1
            className="text-6xl font-bold mb-4"
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#1A1A1A',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Thematic Exploration
          </motion.h1>
          <motion.p
            className="text-xl"
            style={{ color: '#666' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Choose your perspective and dive into the philosophical heart of Don
            Quixote
          </motion.p>
        </div>

        <ThemesCard />

        <motion.div
          className="mt-20 p-8 rounded-lg border-2 border-gray-200"
          style={{ backgroundColor: '#FFF' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#1A1A1A',
            }}
          >
            About This Component
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#333' }}>
            This interactive Themes card presents the philosophical core of
            Cervantes' masterpiece through two distinct lenses: the idealism of
            Don Quixote and the realism of Sancho Panza. Use the slider to shift
            perspectives and watch how the interpretation of each theme
            transforms. Expand each theme to explore the deep philosophical
            tensions that make Don Quixote not just a novel, but a meditation on
            truth, perception, and human nature.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
