import { useState } from 'react';
import { levels, allChapters } from '../data/chapters';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import '../Sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  const { chapterId } = useParams();
  const { isCompleted, isUnlocked } = useGame();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(() => {
    const lvl = levels.find(l => l.chapters.some(c => c.id === chapterId));
    return new Set(lvl ? [lvl.id] : [1]);
  });
  const [search, setSearch] = useState('');

  const toggleLevel = (id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleChapter = (id) => {
    if (!isUnlocked(id)) return;
    navigate(`/chapter/${id}`);
    if (window.innerWidth < 768) onClose?.();
  };

  const filtered = search
    ? levels.map(l => ({ ...l, chapters: l.chapters.filter(c => c.title.toLowerCase().includes(search.toLowerCase())) })).filter(l => l.chapters.length)
    : levels;

  const levelColors = { 1: '#22c55e', 2: '#3b82f6', 3: '#f59e0b', 4: '#8b5cf6', 5: '#ec4899' };

  return (
    <>
      {/* Overlay for mobile */}
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo" onClick={() => { navigate('/'); onClose?.(); }} style={{ cursor: 'pointer', padding: '24px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ background: 'var(--brand)', color: '#000', fontWeight: '900', fontSize: '18px', width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif", flexShrink: 0 }}>
            JS
          </div>
          <div className="sidebar-logo-text">
            <div className="sidebar-logo-name" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: '800', color: 'var(--text-ink)', lineHeight: 1.2 }}>JS Mastery</div>
            <div className="sidebar-logo-sub" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-ink-light)' }}>Notes & Guide</div>
          </div>
        </div>

        {/* Search */}
        <div className="sidebar-search">
          <div className="sidebar-search-wrap">
            <svg className="sidebar-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search topics..."
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {filtered.map(level => {
            const isExp = search ? true : expanded.has(level.id);
            const col = levelColors[level.id];
            return (
              <div key={level.id}>
                <div className="level-header" onClick={() => toggleLevel(level.id)}>
                  <span className="level-dot" style={{ background: col }} />
                  <span style={{ color: col }}>Level {level.id}: {level.title.replace(/Level \d: /, '')}</span>
                  <svg className={`level-chevron ${isExp ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>

                {isExp && level.chapters.map(ch => {
                  const completed = isCompleted(ch.id);
                  const unlocked = isUnlocked(ch.id);
                  
                  return (
                    <div
                      key={ch.id}
                      className={`chapter-link ${ch.id === chapterId ? 'active' : ''}`}
                      onClick={() => handleChapter(ch.id)}
                      style={{ opacity: unlocked ? 1 : 0.5, cursor: unlocked ? 'pointer' : 'not-allowed' }}
                    >
                      <span className="chapter-link-emoji">
                        {!unlocked ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        ) : completed ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
                        ) : ch.emoji}
                      </span>
                      <span className="chapter-link-title" style={completed ? { color: 'var(--tx-3)', textDecoration: 'line-through' } : {}}>{ch.title}</span>
                      <span className="chapter-link-time">{ch.time}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div style={{ marginBottom: '4px' }}>{allChapters.length} chapters · 5 levels</div>
          <div style={{ color: 'var(--text-ink)' }}>
            Created by <a href="https://soyeb.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 800 }}>Soyeb.in</a>
          </div>
        </div>
      </aside>
    </>
  );
}
