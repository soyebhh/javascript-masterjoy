import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chapter from './pages/Chapter';
import LearnChapter from './pages/LearnChapter';
import Arcade from './pages/Arcade';
import { GameProvider } from './context/GameContext';

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="chapter/:chapterId" element={<LearnChapter />} />
            <Route path="chapter/:chapterId/:levelId" element={<Chapter />} />
            <Route path="arcade" element={<Arcade />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}
