import { BrowserRouter, Navigate, Routes, Route } from 'react-router';
import { ViewModeProvider } from './context/ViewModeContext';
import { ModeToggle } from './components/layout/ModeToggle';
import { LandingPage } from './components/pages/LandingPage';
import { LibraryOfMadness } from './components/modules/LibraryOfMadness';
import { TimelineModule } from './components/modules/TimelineModule';
import { JourneyVisualizer } from './components/modules/JourneyVisualizer';
import { ThemesPage } from './components/pages/ThemesPage';

export default function App() {
  return (
    <ViewModeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-700">
          <ModeToggle />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/books" element={<LibraryOfMadness />} />
            <Route path="/library" element={<LibraryOfMadness />} />
            <Route path="/timeline" element={<TimelineModule />} />
            <Route path="/journey" element={<JourneyVisualizer />} />
            <Route path="/themes" element={<ThemesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ViewModeProvider>
  );
}
