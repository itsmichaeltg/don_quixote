import { useViewMode } from '../../context/ViewModeContext';
import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { motion } from 'motion/react';
import { Map, BookText, Users, Sparkles, Compass, Lightbulb, Library, GitBranch } from 'lucide-react';
import { Link } from 'react-router';

export function LandingPage() {
  const { mode, setMode } = useViewMode();

  const modules = [
    {
      icon: Map,
      title: 'Geopolitical Map',
      description: 'Explore the Hapsburg Empire and Age of Empire upheavals',
      path: '/map'
    },
    {
      icon: Library,
      title: 'Library of Madness',
      description: 'The books of chivalry that shaped Quixote\'s delusions',
      path: '/library'
    },
    {
      icon: GitBranch,
      title: 'Dialectic Slider',
      description: 'Compare objective reality vs individual experience',
      path: '/dialectic'
    },
    {
      icon: Compass,
      title: 'Timeline',
      description: 'Navigate from 1550-1650 through historical upheavals',
      path: '/timeline'
    },
    {
      icon: Users,
      title: 'Character Network',
      description: 'Visual connections between characters and their roles',
      path: '/characters'
    },
    {
      icon: BookText,
      title: 'Journey Visualizer',
      description: 'Follow the three Sallys across La Mancha',
      path: '/journey'
    },
    {
      icon: Sparkles,
      title: 'Themes & Philosophy',
      description: 'The philosophical tensions between Idealism and Realism',
      path: '/themes'
    },
    {
      icon: Lightbulb,
      title: 'Revolutionary Ideas',
      description: 'What makes Cervantes modern and revolutionary?',
      path: '/revolutionary'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1774202977950-fea3256c9f87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Windmills of La Mancha"
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              mode === 'truth'
                ? 'bg-gradient-to-b from-woodcut-black/60 via-stone-gray/40 to-parchment/80'
                : 'bg-gradient-to-b from-enchantment-purple/70 via-knight-azure/50 to-romance-rose/40'
            }`}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl text-black">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl mb-6 tracking-tight">
              <span className="block">Truth or Dare:</span>
              <span className="block mt-2">Don Quixote</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-4 opacity-90">
              in an Age of Empire
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-80">
              An interactive exploration of Cervantes's masterpiece through the dual lens of
              Imperial Reality and Chivalric Illusion
            </p>
          </motion.div>

          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              size="lg"
              variant={mode === 'truth' ? 'default' : 'outline'}
              onClick={() => setMode('truth')}
              className="text-lg px-8 py-6"
            >
              Enter Truth Mode
            </Button>
            <Button
              size="lg"
              variant={mode === 'dare' ? 'default' : 'outline'}
              onClick={() => setMode('dare')}
              className="text-lg px-8 py-6"
            >
              Enter Dare Mode
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-current rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Modules Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-4">
              Explore the Dual Reality
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Navigate through interactive modules that reveal the tension between
              sanity and madness, truth and falsehood, history and fiction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={module.path} className="block h-full">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardHeader>
                      <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:scale-110 transition-transform">
                        <module.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <CardDescription className="text-base">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Context Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl mb-8 text-center">
              The Great Upheavals
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                This exploration examines Don Quixote against the backdrop of transformative
                historical forces that shaped the early modern world:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Renaissance Europe's discovery of America</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Feudalism's demise and the rise of mass poverty</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Reformation and Counter-Reformation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Extermination of heretics and war against infidels</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>The decline of the Hapsburg dynasty</span>
                </li>
              </ul>
              <p>
                The hapless protagonist calls into question the boundaries between sanity and
                madness, truth and falsehood, history and fiction, objectivity and individual
                experience. What might be modern, perhaps even revolutionary, in Cervantes's
                dramatization of the moral and material dilemmas of his time?
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
