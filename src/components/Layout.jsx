import { Outlet, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useState } from 'react';
import { t } from '../data/translationEngine';
import Sidebar from './Sidebar';

export default function Layout() {
  const { xp, godMode, toggleGodMode, resetProgress, language, toggleLanguage } = useGame();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="rpg-wrapper" style={{ flexDirection: 'row' }}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {/* Top Status Bar matching JS Mastery Screenshot */}
        <div className="top-bar" style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Hamburger Menu (visible mostly on mobile) */}
            <button 
              className="mobile-hamburger"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-ink)',
                cursor: 'pointer',
                display: 'flex',
                padding: '5px'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>

            {/* Logo */}
            <div 
              onClick={() => navigate('/')}
              style={{ 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <div style={{ background: 'var(--brand)', color: '#000', fontWeight: '900', fontSize: '14px', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
                JS
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: '700', fontSize: '18px', color: 'var(--text-ink)', letterSpacing: '-0.5px' }}>
                Mastery Notes
              </div>
            </div>
          </div>
          
          <div className="top-bar-actions" style={{ gap: '20px' }}>
            
            {/* Search Button matching screenshot */}
            <button 
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-ink)',
                cursor: 'pointer'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            
            <div style={{ position: 'relative' }}>
              <button 
                className="top-action-btn" 
                onClick={() => setShowSettings(!showSettings)}
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </button>
              
              {showSettings && (
                <div className="settings-dropdown">
                  <div className="settings-dropdown-title">Preferences</div>
                  
                  <button 
                    className="top-action-btn" 
                    onClick={toggleLanguage}
                    style={{ width: '100%', justifyContent: 'center', marginBottom: 15 }}
                  >
                    {language === 'english' ? 'Switch to Hinglish' : 'Switch to English'}
                  </button>

                  <div className="settings-dropdown-title">Developer Options</div>
                  
                  <label className="settings-checkbox">
                    <input type="checkbox" checked={godMode} onChange={toggleGodMode} />
                    <span>{t('unlockAll', language)}</span>
                  </label>
                  
                  <button 
                    className="btn-run"
                    style={{ width: '100%', background: 'var(--error)', color: '#fff', border: 'none' }}
                    onClick={() => { resetProgress(); setShowSettings(false); }}
                  >
                    {t('resetProgress', language)}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Game Body */}
        <div className="game-area">
          <Outlet />
        </div>

        {/* Global Footer */}
        <div style={{ 
          position: 'fixed', bottom: 10, right: 10, 
          fontFamily: "'Playfair Display', serif", fontSize: '12px', 
          color: 'var(--text-ink-light)', zIndex: 9999,
          background: 'var(--bg-paper-dark)', padding: '4px 8px', border: '1px solid var(--glass-border)', borderRadius: '4px'
        }}>
          Created by <a href="https://soyeb.in" target="_blank" rel="noreferrer" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 'bold' }}>Soyeb.in</a>
        </div>
      </div>
    </div>
  );
}
