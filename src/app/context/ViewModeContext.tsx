import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ViewMode = 'truth' | 'dare';

interface ViewModeContextType {
  mode: ViewMode;
  toggleMode: () => void;
  setMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>(() => {
    const stored = localStorage.getItem('don-quixote-mode');
    return (stored === 'truth' || stored === 'dare') ? stored : 'truth';
  });

  useEffect(() => {
    localStorage.setItem('don-quixote-mode', mode);

    if (mode === 'dare') {
      document.documentElement.classList.add('dare-mode');
    } else {
      document.documentElement.classList.remove('dare-mode');
    }
  }, [mode]);

  const toggleMode = () => {
    setModeState(prev => prev === 'truth' ? 'dare' : 'truth');
  };

  const setMode = (newMode: ViewMode) => {
    setModeState(newMode);
  };

  return (
    <ViewModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}
