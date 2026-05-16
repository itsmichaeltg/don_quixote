import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface ThemeContent {
  title: string;
  description: string;
}

interface PerspectiveView {
  quixote: ThemeContent;
  sancho: ThemeContent;
}

const THEMES: PerspectiveView[] = [
  {
    quixote: {
      title: 'Perspective & Madness',
      description: '"Quixotizement"—the noble art of choosing one\'s own reality. Don Quixote demonstrates that madness and idealism are intertwined; he sees giants where others see windmills, castles where others see inns. His madness is a deliberate choice—a philosophical stance that reality is what we perceive it to be.',
    },
    sancho: {
      title: 'Perspective & Madness',
      description: 'Sancho\'s realism grounds the narrative in practical wisdom. He sees windmills as windmills, yet he remains devoted to his master\'s illusions. His madness lies not in delusion, but in his unwavering loyalty to someone who refuses to see the world as it is. The squire becomes a mirror of human compromise.',
    },
  },
  {
    quixote: {
      title: 'Metafiction (The Book Within the Book)',
      description: 'By the novel\'s second half, Don Quixote learns that a chronicle of his adventures already exists—he has become a character in a book. This creates a dizzying philosophical loop: he pursues adventures to live up to the literary expectations of himself, blurring the lines between life and fiction.',
    },
    sancho: {
      title: 'Metafiction (The Book Within the Book)',
      description: 'Sancho\'s awareness of the text grounds metafiction in everyday reality. He questions whether their stories are being told, whether they\'re destined for fame or obscurity. His pragmatic relationship with narrative paradoxically makes the metafictional elements more poignant—fame means nothing if it doesn\'t put food on the table.',
    },
  },
  {
    quixote: {
      title: 'Class & Companionship',
      description: 'Don Quixote seeks a squire to fulfill the chivalric tradition. Yet his relationship with Sancho transcends class hierarchy—they are equals in adventure, despite their different social stations. The knight\'s dependence on the peasant reveals that nobility is not inherited but earned through shared struggle.',
    },
    sancho: {
      title: 'Class & Companionship',
      description: 'Sancho is motivated by the promise of wealth and status—the governor\'s island. Yet his devotion to Don Quixote grows beyond mercenary concerns. The squire\'s journey is one of self-discovery; he learns wisdom not from books but from experience, proving that nobility exists outside of birth and privilege.',
    },
  },
];

const PERSPECTIVES = ['Giants & Castles', 'Windmills & Inns'];
const PERSPECTIVE_LABELS = {
  left: 'Don Quixote\n(Idealism)',
  right: 'Sancho Panza\n(Realism)',
};

export function ThemesCard() {
  const [perspective, setPerspective] = useState(0.5); // 0 = Quixote, 1 = Sancho
  const [expandedTheme, setExpandedTheme] = useState<number | null>(null);

  const isQuixote = perspective < 0.5;
  const currentPerspectiveLabel = isQuixote
    ? 'Don Quixote (Idealism)'
    : 'Sancho Panza (Realism)';
  const perspectiveView = isQuixote ? 'quixote' : 'sancho';

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerspective(parseFloat(e.currentTarget.value));
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Card Container */}
      <motion.div
        className="rounded-xl border-2 border-gray-200 overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: '#FDFBF7',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        }}
        whileHover={{
          y: -4,
          boxShadow: '0 12px 24px rgba(212, 175, 55, 0.15)',
        }}
      >
        {/* HEADER SECTION */}
        <div className="px-8 pt-8 pb-6 border-b-2 border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h2
              className="text-4xl font-bold mb-2"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: '#1A1A1A',
              }}
            >
              Themes & Philosophy
            </h2>
            <p className="text-sm mb-4" style={{ color: '#666' }}>
              The thin line between madness and reality.
            </p>
            <p
              className="italic text-base"
              style={{
                color: '#D4AF37',
                fontStyle: 'italic',
              }}
            >
              "Sancho, if you do not see them, it is because you know nothing of
              adventures..."
            </p>
          </motion.div>
        </div>

        {/* INTERACTIVE PERSPECTIVE SLIDER */}
        <div className="px-8 py-8 border-b-2 border-gray-200">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Current Perspective Label */}
            <div className="text-center mb-6">
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#D4AF37' }}
              >
                Current View
              </p>
              <p
                className="text-2xl font-bold mt-2"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#1A1A1A',
                }}
              >
                {currentPerspectiveLabel}
              </p>
              <motion.p
                className="text-lg mt-2 font-medium"
                style={{ color: '#666' }}
                key={perspectiveView}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                "{PERSPECTIVES[isQuixote ? 0 : 1]}"
              </motion.p>
            </div>

            {/* Slider Container */}
            <div className="mb-6">
              <div className="relative pt-6 pb-2">
                {/* Background Track */}
                <div
                  className="absolute h-1 rounded-full w-full top-8"
                  style={{ backgroundColor: '#E5E5E5', zIndex: 1 }}
                />

                {/* Filled Track (Gold) */}
                <motion.div
                  className="absolute h-1 rounded-full top-8"
                  style={{
                    backgroundColor: '#D4AF37',
                    width: `${perspective * 100}%`,
                    zIndex: 2,
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Slider Input */}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={perspective}
                  onChange={handleSliderChange}
                  className="relative w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer"
                  style={{
                    zIndex: 5,
                    WebkitAppearance: 'none',
                  }}
                />

                {/* Custom Slider Styling */}
                <style>{`
                  input[type='range'] {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    width: 100%;
                    height: 2px;
                    outline: none;
                  }

                  input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: #D4AF37;
                    cursor: pointer;
                    box-shadow: 0 2px 12px rgba(212, 175, 55, 0.5);
                    border: 3px solid white;
                    transition: all 0.2s ease;
                  }

                  input[type='range']::-webkit-slider-thumb:hover {
                    transform: scale(1.15);
                    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.7);
                  }

                  input[type='range']::-webkit-slider-thumb:active {
                    transform: scale(1.1);
                  }

                  input[type='range']::-moz-range-thumb {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: #D4AF37;
                    cursor: pointer;
                    box-shadow: 0 2px 12px rgba(212, 175, 55, 0.5);
                    border: 3px solid white;
                    transition: all 0.2s ease;
                  }

                  input[type='range']::-moz-range-thumb:hover {
                    transform: scale(1.15);
                    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.7);
                  }

                  input[type='range']::-moz-range-track {
                    background: transparent;
                    border: none;
                  }

                  input[type='range']::-moz-range-progress {
                    background: transparent;
                  }
                `}</style>
              </div>
            </div>

            {/* Slider Labels */}
            <div className="flex justify-between items-center text-xs font-semibold">
              <div className="text-center flex-1">
                <p style={{ color: isQuixote ? '#D4AF37' : '#999' }}>
                  Don Quixote
                </p>
                <p style={{ color: isQuixote ? '#D4AF37' : '#999' }}>
                  (Idealism)
                </p>
              </div>
              <div className="text-center flex-1">
                <p style={{ color: !isQuixote ? '#D4AF37' : '#999' }}>
                  Sancho Panza
                </p>
                <p style={{ color: !isQuixote ? '#D4AF37' : '#999' }}>
                  (Realism)
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CORE THEMES SECTION */}
        <div className="px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3
              className="text-xl font-bold mb-6"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: '#1A1A1A',
              }}
            >
              The 3 Core Themes
            </h3>

            <div className="space-y-3">
              <AnimatePresence>
                {THEMES.map((theme, index) => {
                  const isExpanded = expandedTheme === index;
                  const content =
                    theme[perspectiveView as keyof typeof theme];

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    >
                      <motion.button
                        onClick={() =>
                          setExpandedTheme(isExpanded ? null : index)
                        }
                        className="w-full text-left px-6 py-4 rounded-lg border-2 border-gray-200 transition-all hover:border-amber-200"
                        style={{
                          backgroundColor: isExpanded ? '#FFF9F0' : '#FDFBF7',
                          borderColor: isExpanded ? '#D4AF37' : '#E5E5E5',
                        }}
                        whileHover={{
                          backgroundColor: '#FFF9F0',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <p
                            className="font-bold"
                            style={{
                              color: '#1A1A1A',
                              fontFamily: 'Playfair Display, serif',
                            }}
                          >
                            {content.title}
                          </p>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown
                              size={20}
                              style={{ color: '#D4AF37' }}
                            />
                          </motion.div>
                        </div>
                      </motion.button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="px-6 py-4 bg-white border-l-4 border-r-2 border-b-2 rounded-b-lg"
                              style={{
                                borderColor: '#D4AF37',
                                backgroundColor: '#FDFBF7',
                              }}
                            >
                              <p
                                className="text-sm leading-relaxed"
                                style={{ color: '#333' }}
                              >
                                {content.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* CTA BUTTON */}
        <div className="px-8 py-6 border-t-2 border-gray-200 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <Button
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold"
              style={{
                backgroundColor: '#D4AF37',
                color: '#1A1A1A',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C49C2C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#D4AF37';
              }}
            >
              Explore the Illusion
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
