import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  Castle,
  Compass,
  ExternalLink,
  MapPinned,
  Route,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import locationsData from '../../../data/journey_locations.json';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  chapter: string;
  journey: string;
  episode: string;
  connection: string;
  reality: string;
  quixoteView: string;
  mapPosition: { x: number; y: number };
}

const journeyColors: Record<string, string> = {
  'First journey': '#B88A2C',
  'Second journey': '#8B2F2B',
  'Third journey': '#28715F',
};

const sources = [
  {
    label: 'Part I chapters 1-8',
    href: 'https://www.gutenberg.org/files/5921/old/orig5921-h/p2.htm',
  },
  {
    label: 'Part I chapters 23-30',
    href: 'https://www.gutenberg.org/files/5921/old/orig5921-h/p4.htm',
  },
  {
    label: 'Spain.info: Argamasilla tradition',
    href: 'https://www.spain.info/en/places-of-interest/casa-medrano-cave/',
  },
  {
    label: 'Campo de Criptana tourism',
    href: 'https://www.turismocastillalamancha.es/es/destinos/encanto-rural/ciudad-real/campo-de-criptana',
  },
];

function createMarkerIcon(index: number, color: string, isSelected: boolean) {
  const size = isSelected ? 42 : 34;
  const fontSize = isSelected ? 16 : 14;

  return L.divIcon({
    className: '',
    html: `
      <span style="
        align-items: center;
        background: ${color};
        border: 3px solid #fffdf8;
        border-radius: 8px;
        box-shadow: 0 10px 22px rgba(0,0,0,0.28);
        color: white;
        display: flex;
        font-size: ${fontSize}px;
        font-weight: 800;
        height: ${size}px;
        justify-content: center;
        width: ${size}px;
      ">
        ${index + 1}
      </span>
    `,
    iconAnchor: [size / 2, size / 2],
    iconSize: [size, size],
    popupAnchor: [0, -size / 2],
  });
}

export function JourneyVisualizer() {
  const locations = useMemo(() => locationsData.locations as Location[], []);
  const [selectedId, setSelectedId] = useState(locations[3]?.id ?? locations[0].id);
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const selectedLocation = useMemo(
    () => locations.find((location) => location.id === selectedId) ?? locations[0],
    [locations, selectedId],
  );

  const selectedColor = journeyColors[selectedLocation.journey] ?? '#B88A2C';

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return;

    const map = L.map(mapElementRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const routeCoordinates = locations.map(
      (location) => [location.coordinates.lat, location.coordinates.lng] as L.LatLngExpression,
    );

    L.polyline(routeCoordinates, {
      color: '#171411',
      dashArray: '6 9',
      opacity: 0.72,
      weight: 4,
    }).addTo(map);

    locations.forEach((location, index) => {
      const color = journeyColors[location.journey] ?? '#B88A2C';
      const marker = L.marker([location.coordinates.lat, location.coordinates.lng], {
        icon: createMarkerIcon(index, color, location.id === selectedId),
      })
        .addTo(map)
        .bindTooltip(`${index + 1}. ${location.name}`, {
          direction: 'top',
          offset: [0, -18],
          opacity: 0.94,
        })
        .on('click', () => setSelectedId(location.id));

      markersRef.current[location.id] = marker;
    });

    map.fitBounds(L.latLngBounds(routeCoordinates), {
      padding: [44, 44],
    });

    mapRef.current = map;
    window.setTimeout(() => {
      map.invalidateSize();
      const selected = locations.find((location) => location.id === selectedId);
      if (selected) {
        map.setView(
          [selected.coordinates.lat, selected.coordinates.lng],
          selected.id === 'barcelona' ? 6 : 8,
          { animate: false },
        );
      }
    }, 0);

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, [locations]);

  useEffect(() => {
    const map = mapRef.current;
    const selectedIndex = locations.findIndex((location) => location.id === selectedId);
    const selected = locations[selectedIndex];

    locations.forEach((location, index) => {
      const marker = markersRef.current[location.id];
      if (!marker) return;

      marker.setIcon(
        createMarkerIcon(
          index,
          journeyColors[location.journey] ?? '#B88A2C',
          location.id === selectedId,
        ),
      );
    });

    if (!map || !selected) return;

    map.invalidateSize();
    map.setView(
      [selected.coordinates.lat, selected.coordinates.lng],
      selected.id === 'barcelona' ? 6 : 8,
      { animate: false },
    );
  }, [locations, selectedId]);

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
          className="mb-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Compass className="h-4 w-4" />
              Journey
            </p>
            <h1 className="mt-3 max-w-full break-words text-3xl font-semibold sm:text-6xl">The road keeps correcting the book.</h1>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Cervantes never gives us a neat GPS route. This map treats the journey as a reading path: named places, traditional identifications, and narrative pressure points from all three sallies.
          </p>
        </motion.header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="relative h-[520px] overflow-hidden rounded-lg border bg-card shadow-xl lg:h-[640px]"
          >
            <div ref={mapElementRef} className="absolute inset-0 z-0" aria-label="Interactive OpenStreetMap of Don Quixote journey locations" />

            <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-lg border bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <MapPinned className="h-4 w-4" />
                Actual map
              </p>
              <p className="mt-1 max-w-64 text-xs text-muted-foreground">
                Pins are factual places, traditional identifications, or narrative anchors.
              </p>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap gap-2">
              {Object.entries(journeyColors).map(([journey, color]) => (
                <span key={journey} className="inline-flex items-center gap-2 rounded-lg border bg-card/90 px-3 py-2 text-sm shadow-sm backdrop-blur-sm">
                  <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
                  {journey}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.article
                key={selectedLocation.id}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.25 }}
                className="rounded-lg border bg-card p-5 shadow-xl"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: selectedColor }}>
                      {selectedLocation.journey}
                    </Badge>
                    <h2 className="text-4xl font-semibold">{selectedLocation.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {selectedLocation.chapter} · {selectedLocation.coordinates.lat.toFixed(3)}°, {selectedLocation.coordinates.lng.toFixed(3)}°
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <MapPinned className="h-6 w-6" />
                  </div>
                </div>

                <p className="mt-5 text-lg font-semibold">{selectedLocation.episode}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{selectedLocation.connection}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border bg-background p-4">
                    <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                      <BookOpen className="h-4 w-4" />
                      Road reality
                    </p>
                    <p className="leading-relaxed text-muted-foreground">{selectedLocation.reality}</p>
                  </div>
                  <div className="rounded-lg border bg-background p-4">
                    <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent">
                      <Castle className="h-4 w-4" />
                      Knightly reading
                    </p>
                    <p className="leading-relaxed text-muted-foreground">{selectedLocation.quixoteView}</p>
                  </div>
                </div>

                {/* <div className="mt-5 rounded-lg border bg-primary/10 p-4">
                  <p className="text-sm font-semibold text-primary">Reading question</p>
                  <p className="mt-2 leading-relaxed">{selectedLocation.readingQuestion}</p>
                </div> */}
              </motion.article>
            </AnimatePresence>

            <div className="grid gap-2">
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => setSelectedId(location.id)}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left transition ${
                    selectedLocation.id === location.id
                      ? 'border-primary bg-primary/15'
                      : 'bg-card/80 text-muted-foreground hover:bg-card'
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: journeyColors[location.journey] }}>
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{location.name}</span>
                    <span className="block text-sm">{location.chapter}</span>
                  </span>
                  <Route className="h-4 w-4 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-lg border bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            Source trail
          </p>
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
