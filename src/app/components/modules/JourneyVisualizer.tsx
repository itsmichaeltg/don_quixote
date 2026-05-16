import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useViewMode } from '../../context/ViewModeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import locationsData from '../../../data/journey_locations.json';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  chapter: string;
  connection: string;
  mapPosition: { x: number; y: number };
}

export function JourneyVisualizer() {
  const { mode } = useViewMode();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const locations = locationsData.locations as Location[];
  const [map, setMap] = useState<L.Map | null>(null);

  // Initialize the map
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const leafletMap = L.map(mapContainer).setView([38.8, -3.5], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(leafletMap);

    // Add markers for each location
    locations.forEach((location) => {
      const marker = L.marker([location.coordinates.lat, location.coordinates.lng])
        .addTo(leafletMap)
        .bindPopup(`<div class="p-2"><p class="font-bold text-sm">${location.name}</p><p class="text-xs">${location.chapter}</p></div>`)
        .on('click', () => setSelectedLocation(location));
    });

    setMap(leafletMap);

    return () => {
      leafletMap.remove();
    };
  }, [locations]);

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
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl mb-4">Journey Through La Mancha</h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            {mode === 'truth'
              ? 'Real geography of Don Quixote\'s wanderings across the dusty plains of central Spain'
              : 'The heroic quest across legendary landscapes where dreams took physical form'}
          </p>
          <p className="text-sm mt-4 text-muted-foreground">
            Click any location marker or card to see its connection to the story
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div id="map" className="w-full h-96 bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl overflow-hidden border-2 border-gray-300" />
        </motion.div>

        {/* Map Legend */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="text-center">
            <p className="text-muted-foreground">
              Part I, Chapters 1–30 • Central Spain (La Mancha Region)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{backgroundColor: mode === 'truth' ? '#7c2d12' : '#be185d'}} />
            <span className="text-sm text-muted-foreground">Story Locations</span>
          </div>
        </motion.div>

        {/* Locations Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {locations.map((location) => (
            <motion.div
              key={location.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                className="cursor-pointer h-full transition-all hover:shadow-lg"
                onClick={() => setSelectedLocation(location)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{location.name}</CardTitle>
                  <CardDescription>
                    {location.coordinates.lat.toFixed(4)}° N, {Math.abs(location.coordinates.lng).toFixed(4)}° W
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="w-fit mb-3">{location.chapter}</Badge>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {location.connection}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Context Section */}
        <motion.div
          className="mt-12 p-8 bg-card rounded-xl border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl mb-4">
            {mode === 'truth' ? 'The Geography of Disillusionment' : 'The Map of Adventure'}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {mode === 'truth'
              ? 'The real-world geography of central and southern Spain provides a stark, dusty backdrop for Don Quixote\'s wanderings. These actual locations—from the arid plateau of Campo de Montiel to the rugged Sierra Morena mountains—ground Cervantes\'s satire in a recognizable landscape of economic hardship and rural decline.'
              : 'These legendary places transformed into a stage for heroic deeds under the gaze of Don Quixote. Each location witnessed the birth of adventure as the knight-errant\'s imagination transfigured dusty plains into battlefields of glory and simple inns into castles of romance.'}
          </p>
        </motion.div>
      </div>

      {/* Location Detail Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLocation(null)}
            />

            {/* Modal Card */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLocation(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full" style={{backgroundColor: mode === 'truth' ? '#7c2d12' : '#be185d'}} />
                          <CardTitle className="text-3xl">{selectedLocation.name}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {selectedLocation.coordinates.lat.toFixed(4)}° N, {Math.abs(selectedLocation.coordinates.lng).toFixed(4)}° W
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedLocation(null)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    <Badge className="w-fit mt-2">{selectedLocation.chapter}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Connection to the Story</h3>
                      <p className="leading-relaxed text-muted-foreground">
                        {selectedLocation.connection}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
