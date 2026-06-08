import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { quests } from '../data/gridQuests';

export default function Home() {
  const navigate = useNavigate();
  const { isUnlocked, isCompleted, completedLevels } = useGame();
  
  const questList = Object.values(quests);
  const totalLevels = questList.reduce((acc, chap) => acc + chap.levels.length, 0);

  const handleStartLearning = () => {
    // If nothing completed, go to intro
    if (completedLevels.length === 0) {
      navigate('/chapter/intro');
      return;
    }
    // Else find the first unlocked but incomplete chapter
    for (const chapter of questList) {
      for (let i = 0; i < chapter.levels.length; i++) {
        const lvl = chapter.levels[i];
        const prevLvl = i > 0 ? chapter.levels[i - 1].levelId : null;
        const isFirstEver = chapter.id === 'intro' && i === 0;
        const unlocked = isFirstEver || isUnlocked(lvl.levelId, prevLvl);
        if (unlocked && !isCompleted(lvl.levelId)) {
          navigate(`/chapter/${chapter.id}`);
          return;
        }
      }
    }
    navigate('/chapter/intro');
  };

  return (
    <div style={{ 
      width: '100%', 
      height: 'calc(100vh - 60px)', 
      overflowY: 'auto', 
      background: 'var(--bg-paper-dark)',
      padding: '20px 15px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Main Hero Card */}
        <div style={{
          background: 'linear-gradient(145deg, #1E293B, #0F172A)',
          borderRadius: '24px',
          padding: '40px 30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          
          {/* Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid var(--brand)',
            color: 'var(--brand)',
            padding: '6px 16px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: '700',
            fontFamily: "'Inter', sans-serif"
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m13 2-2 10h9l-9 10 2-10H4l9-10z"/></svg>
            Complete Learning Resource
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(40px, 8vw, 64px)',
            fontWeight: '900',
            lineHeight: '1.1',
            margin: '0',
            color: '#FFFFFF',
            letterSpacing: '-1px'
          }}>
            JavaScript <br/>
            <span style={{ color: 'var(--brand)' }}>Mastery</span> <br/>
            Notes
          </h1>

          {/* Description */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '17px',
            lineHeight: '1.6',
            color: 'var(--tx-2)',
            margin: '0',
            maxWidth: '500px'
          }}>
            From absolute beginner to senior developer. Learn every concept, build real projects, and crack any JavaScript interview.
          </p>

          {/* Buttons Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px', width: '100%' }}>
            
            <button 
              onClick={handleStartLearning}
              style={{
                background: 'var(--brand)',
                color: '#000000',
                border: 'none',
                padding: '16px 28px',
                borderRadius: '12px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '800',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: 'var(--brand-glow)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Start Learning
            </button>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate('/chapter/intro')}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--tx-2)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Interview Guide
              </button>

              <button 
                onClick={() => navigate('/chapter/intro')}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--tx-2)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                Projects
              </button>
            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          
          <div style={{
            background: 'linear-gradient(145deg, #1E293B, #0F172A)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(250, 204, 21, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff', fontFamily: "'Inter', sans-serif" }}>40+</div>
              <div style={{ fontSize: '13px', color: 'var(--tx-2)', fontWeight: '600' }}>Chapters</div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(145deg, #1E293B, #0F172A)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff', fontFamily: "'Inter', sans-serif" }}>200+</div>
              <div style={{ fontSize: '13px', color: 'var(--tx-2)', fontWeight: '600' }}>Exercises</div>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}
