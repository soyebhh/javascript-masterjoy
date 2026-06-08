import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { allChapters } from '../data/chapters';
import { useGame } from '../context/GameContext';

export default function Header({ onMenuToggle, readingMode, toggleReadingMode }) {
  const { currentRank, nextRank, xp } = useGame();
  const [progress, setProgress] = useState(0);
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const idx = allChapters.findIndex(c => c.id === chapterId);
  const prev = idx > 0 ? allChapters[idx - 1] : null;
  const next = idx < allChapters.length - 1 ? allChapters[idx + 1] : null;
  const current = allChapters[idx];

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const s = el.scrollTop || document.body.scrollTop;
      const h = el.scrollHeight - el.clientHeight;
      setProgress(h > 0 ? (s / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div id="reading-progress" style={{ width: `${progress}%` }} />

      <header className="topbar">
        {/* Mobile menu */}
        <button className="topbar-menu-btn" onClick={onMenuToggle} style={{ display: 'flex' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>

        {/* Breadcrumb */}
        <div className="topbar-breadcrumb">
          <span
            style={{ cursor: 'pointer', color: 'var(--tx-3)' }}
            onClick={() => navigate('/')}
          >
            JS Mastery
          </span>
          {current && (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
              <span className="current">{current.emoji} {current.title}</span>
            </>
          )}
        </div>

        {/* Actions & Game Stats */}
        <div className="topbar-actions" style={{ gap: 16 }}>
          
          {/* XP & Rank */}
          <div className="game-stats" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface-2)', padding: '4px 12px', borderRadius: 99, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.1 }}>
              <span style={{ fontSize: 10, color: 'var(--tx-3)', fontWeight: 700, textTransform: 'uppercase' }}>{currentRank.name}</span>
              <span style={{ fontSize: 13, color: currentRank.color, fontWeight: 800 }}>{xp} XP</span>
            </div>
            
            {/* Mini XP Bar */}
            {nextRank && (
              <div style={{ width: 60, height: 4, background: 'var(--bg)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ 
                  width: `${Math.min(100, Math.max(0, ((xp - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100))}%`, 
                  height: '100%', 
                  background: currentRank.color,
                  transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </div>
            )}
            {!nextRank && (
               <div style={{ width: 60, height: 4, background: currentRank.color, borderRadius: 99, boxShadow: `0 0 8px ${currentRank.color}` }} />
            )}
          </div>

          <div style={{ width: 1, height: 24, background: 'var(--border)' }} />

          {prev && (
            <button className="topbar-nav-btn" onClick={() => navigate(`/chapter/${prev.id}`)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              <span>{prev.title}</span>
            </button>
          )}

          <button
            className={`btn-outline ${readingMode ? 'active' : ''}`}
            onClick={toggleReadingMode}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            <span className="hide-mobile">Focus</span>
          </button>

          {next && (
            <button className="topbar-nav-btn" onClick={() => navigate(`/chapter/${next.id}`)}>
              <span className="hide-mobile">{next.title}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          )}
        </div>
      </header>
    </>
  );
}
