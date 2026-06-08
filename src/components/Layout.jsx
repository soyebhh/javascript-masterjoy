import { Outlet, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useState } from 'react';
import { t } from '../data/translationEngine';

export default function Layout() {
  const { xp, godMode, toggleGodMode, resetProgress, language, toggleLanguage } = useGame();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="rpg-wrapper">
      
      {/* Top Status Bar */}
      <div className="top-bar">
        <div 
          className="top-bar-title"
          onClick={() => navigate('/')}
        >
          JavaScript Masterjoy
        </div>

        {/* Navigation Tabs */}
        <div className="top-bar-nav">
          <button className="top-nav-btn" onClick={() => navigate('/')}>
            {t('syllabus', language)}
          </button>
          <button className="top-nav-btn" onClick={() => navigate('/quest')}>
            {t('quest', language)}
          </button>
          <button className="top-nav-btn" onClick={() => navigate('/arcade')}>
            {t('timepass', language)}
          </button>
        </div>
        
        <div className="top-bar-actions">
          <div className="top-xp-badge">
            {xp} XP
          </div>
          
          <div style={{ position: 'relative' }}>
            <button className="top-action-btn" onClick={() => setShowSettings(!showSettings)}>
              {t('settings', language)}
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
  );
}
