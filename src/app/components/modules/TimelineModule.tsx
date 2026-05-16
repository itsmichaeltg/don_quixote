import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useViewMode } from '../../context/ViewModeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Scroll, Swords, Coins, BookOpen } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import timelineData from '../../../data/timeline_events.json';

interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  category: 'literature' | 'politics' | 'war' | 'economy';
  truthDescription: string;
  dareDescription: string;
  significance: string;
}

const categoryConfig = {
  literature: { icon: BookOpen, color: 'bg-emerald-quest' },
  politics: { icon: Scroll, color: 'bg-imperial-gold' },
  war: { icon: Swords, color: 'bg-blood-red' },
  economy: { icon: Coins, color: 'bg-dusty-ochre' }
};

export function TimelineModule() {
  const { mode } = useViewMode();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const events = timelineData.events as TimelineEvent[];

  const getIcon = (category: TimelineEvent['category']) => {
    const Icon = categoryConfig[category].icon;
    return <Icon className="w-5 h-5" />;
  };

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
          <h1 className="text-5xl md:text-6xl mb-4">Timeline: 1550–1650</h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            {mode === 'truth'
              ? 'From Golden Age to disillusionment: the historical forces that shaped Don Quixote'
              : 'An epic century of glory, adventure, and the birth of immortal literature'}
          </p>
        </motion.div>

        {/* Category Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {Object.entries(categoryConfig).map(([category, config]) => (
            <Badge key={category} variant="outline" className="px-4 py-2 gap-2">
              {getIcon(category as TimelineEvent['category'])}
              <span className="capitalize">{category}</span>
            </Badge>
          ))}
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Timeline Line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-border -translate-y-1/2 hidden md:block" />

          {/* Timeline Events */}
          <div className="relative space-y-8 md:space-y-0">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              const CategoryIcon = categoryConfig[event.category].icon;

              return (
                <motion.div
                  key={event.id}
                  className={`relative ${
                    isEven ? 'md:text-right' : 'md:text-left'
                  }`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className={`flex flex-col md:flex-row items-center gap-4 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}>
                    {/* Event Card */}
                    <div className="flex-1 max-w-md">
                      <Card
                        className="cursor-pointer hover:shadow-xl transition-all duration-300 group"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              mode === 'truth' ? 'bg-muted' : 'bg-primary/10'
                            } group-hover:scale-110 transition-transform`}>
                              <CategoryIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                              <CardDescription>{event.year}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm line-clamp-3">
                            {mode === 'truth' ? event.truthDescription : event.dareDescription}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative z-10">
                      <motion.div
                        className={`w-4 h-4 rounded-full border-4 ${
                          mode === 'truth' ? 'bg-background border-primary' : 'bg-background border-secondary'
                        }`}
                        whileHover={{ scale: 1.5 }}
                      />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 max-w-md hidden md:block" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Context Section */}
        <motion.div
          className="mt-20 p-8 bg-card rounded-xl border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl mb-4">
            {mode === 'truth' ? 'A Century of Decline' : 'A Century of Transformation'}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {mode === 'truth'
              ? 'This timeline traces Spain\'s transformation from the "Golden Age" of imperial dominance to deep disillusionment. Cervantes wasn\'t just writing a parody of knight-errantry; he was writing the eulogy for an era. Don Quixote\'s madness—clinging to outdated chivalric ideals in a world of economic collapse, military defeat, and religious persecution—mirrors Spain\'s own refusal to accept its decline.'
              : 'This century witnessed the height of Spanish cultural achievement and the birth of modern literature. Despite challenges, the spirit of the age lives on through Cervantes\'s masterwork. Don Quixote\'s idealism represents the eternal human capacity to dream beyond material circumstances, to find meaning and nobility even in a world that seems to have lost its way.'}
          </p>
        </motion.div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedEvent(null)}
            >
              <Card
                className="max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <CardHeader>
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`p-3 rounded-lg ${
                      mode === 'truth' ? 'bg-muted' : 'bg-primary/10'
                    }`}>
                      {getIcon(selectedEvent.category)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-3xl">{selectedEvent.title}</CardTitle>
                      <CardDescription className="text-lg mt-1">
                        {selectedEvent.year}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="w-fit capitalize">{selectedEvent.category}</Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Mode Description */}
                  <div>
                    <h3 className="text-xl font-medium mb-3">
                      {mode === 'truth' ? 'Historical Reality' : 'The Heroic Vision'}
                    </h3>
                    <p className="leading-relaxed">
                      {mode === 'truth' ? selectedEvent.truthDescription : selectedEvent.dareDescription}
                    </p>
                  </div>

                  {/* Alternate Perspective */}
                  <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-accent">
                    <h3 className="text-lg font-medium mb-2">
                      {mode === 'truth' ? 'The Idealist View' : 'The Realist View'}
                    </h3>
                    <p className="leading-relaxed text-sm">
                      {mode === 'truth' ? selectedEvent.dareDescription : selectedEvent.truthDescription}
                    </p>
                  </div>

                  {/* Significance */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Significance for Don Quixote</h3>
                    <p className="leading-relaxed italic">
                      {selectedEvent.significance}
                    </p>
                  </div>

                  <Button onClick={() => setSelectedEvent(null)} className="w-full">
                    Close
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
