import { createContext, useContext, useEffect, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('js_mastery_xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('js_mastery_completed');
    return saved ? JSON.parse(saved) : [];
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('js_mastery_lang') || 'hinglish';
  });

  const [godMode, setGodMode] = useState(() => {
    return localStorage.getItem('js_mastery_godmode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('js_mastery_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('js_mastery_completed', JSON.stringify(completedLevels));
  }, [completedLevels]);

  useEffect(() => {
    localStorage.setItem('js_mastery_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('js_mastery_godmode', godMode.toString());
  }, [godMode]);

  const completeLevel = (levelId, earnedXp = 50) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels(prev => [...prev, levelId]);
      setXp(prev => prev + earnedXp);
      return true;
    }
    return false;
  };

  const addXp = (amount) => {
    setXp(prev => prev + amount);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'hinglish' : 'english');
  };

  const isCompleted = (levelId) => completedLevels.includes(levelId);

  // Simple progression logic: just check if the immediate previous level is done,
  // or use GodMode. For simplicity, we can pass an ordered array of all levelIds
  // from Home.jsx or Chapter.jsx to check.
  const isUnlocked = (levelId, previousLevelId) => {
    if (godMode) return true;
    if (!previousLevelId) return true; // First level
    return isCompleted(previousLevelId);
  };

  const toggleGodMode = () => setGodMode(!godMode);
  
  const resetProgress = () => {
    setCompletedLevels([]);
    setXp(0);
  };

  return (
    <GameContext.Provider value={{
      xp,
      completedLevels,
      godMode,
      language,
      toggleLanguage,
      completeLevel,
      addXp,
      isCompleted,
      isUnlocked,
      toggleGodMode,
      resetProgress
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
