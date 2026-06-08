import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quests } from '../data/gridQuests';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import { t, getDailySpell } from '../data/translationEngine';

const DAILY_SPELLS = [
  {
    id: 1,
    question: "What is the output of `typeof null` in JavaScript?",
    options: ["'null'", "'object'", "'undefined'", "'number'"],
    answer: "'object'",
    hint: "This is a famous JavaScript bug! JS treats null as an object.",
    successMsg: "Kya baat hai! Sahi pakde hain. `typeof null` is indeed 'object'! 🎉"
  },
  {
    id: 2,
    question: "Which keyword creates a variable that CANNOT be changed later?",
    options: ["let", "var", "const", "make"],
    answer: "const",
    hint: "Think of constant (unchanging).",
    successMsg: "Sahi jawab! `const` (constant) values cannot be reassigned! 🔒"
  },
  {
    id: 3,
    question: "What is the output of `2 + '2'` in JavaScript?",
    options: ["4", "'22'", "NaN", "Error"],
    answer: "'22'",
    hint: "When you add a number and a string, JS converts the number to string and joins them (coercion)!",
    successMsg: "Ekdum mast! Number and String add karne par string concatenation ho jata hai. Output is '22'! 🪄"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { isUnlocked, isCompleted, xp, completedLevels, addXp, language } = useGame();

  const questList = Object.values(quests);

  // Stats calculation
  const totalLevels = questList.reduce((acc, chap) => acc + chap.levels.length, 0);
  const completedCount = completedLevels.length;
  
  // Daily Spell State
  const [activeSpell, setActiveSpell] = useState(null);
  const [selectedSpellOption, setSelectedSpellOption] = useState(null);
  const [spellFeedback, setSpellFeedback] = useState(null);
  const [dailyCompleted, setDailyCompleted] = useState(false);

  useEffect(() => {
    // Pick a daily spell based on day of month, or random
    const day = new Date().getDate();
    const spellIndex = day % DAILY_SPELLS.length;
    const localizedSpell = getDailySpell(spellIndex, language);
    
    setActiveSpell({
      ...DAILY_SPELLS[spellIndex],
      question: localizedSpell.question,
      hint: localizedSpell.hint,
      successMsg: localizedSpell.successMsg
    });

    // Check if solved today
    const solved = localStorage.getItem(`daily_spell_solved_${day}`);
    if (solved === 'true') {
      setDailyCompleted(true);
    }
  }, [language]);

  const handleResumeAdventure = () => {
    // Scan all levels to find the first unlocked but incomplete level
    for (const chapter of questList) {
      for (let i = 0; i < chapter.levels.length; i++) {
        const lvl = chapter.levels[i];
        const prevLvl = i > 0 ? chapter.levels[i - 1].levelId : null;
        
        // Check unlock status (first level of first chapter is always unlocked)
        const isFirstEver = chapter.id === 'intro' && i === 0;
        const unlocked = isFirstEver || isUnlocked(lvl.levelId, prevLvl);
        const completed = isCompleted(lvl.levelId);

        if (unlocked && !completed) {
          navigate(`/chapter/${chapter.id}/${lvl.levelId}`);
          return;
        }
      }
    }
    // Fallback: If all levels are complete, go to level 1.1
    navigate('/chapter/intro/1.1');
  };

  const handleSpellAnswer = (option) => {
    if (dailyCompleted || spellFeedback?.type === 'success') return;
    setSelectedSpellOption(option);

    if (option === activeSpell.answer) {
      confetti({ particleCount: 80, spread: 50, origin: { y: 0.8 }, colors: ['#34d399', '#fbbf24'] });
      addXp(15);
      setSpellFeedback({ type: 'success', msg: activeSpell.successMsg });
      
      const day = new Date().getDate();
      localStorage.setItem(`daily_spell_solved_${day}`, 'true');
      setDailyCompleted(true);
    } else {
      setSpellFeedback({ type: 'error', msg: activeSpell.hint });
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      
      {/* 1. Hero Minimal */}
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: 'var(--text-ink)', margin: '0 0 15px 0', fontFamily: "'Outfit', sans-serif" }}>
          JavaScript Masterjoy
        </h1>
        <p style={{ color: 'var(--text-ink-light)', fontSize: 18, margin: '0 auto 30px auto', maxWidth: 600, lineHeight: 1.6 }}>
          {t("Learn JavaScript step by step. No clutter, just pure learning.", language)}
        </p>
        
        <button 
          className="btn-run" 
          onClick={handleResumeAdventure}
          style={{ padding: '14px 32px', fontSize: 16, borderRadius: 30, boxShadow: 'var(--brand-glow)' }}
        >
          {completedCount === 0 ? t('startLearning', language) || 'Start Learning' : t('resumeAdventure', language)}
        </button>
      </div>

      {/* 2. Modules List */}
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-ink)', marginBottom: 20, fontFamily: "'Outfit', sans-serif" }}>
          Syllabus
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {questList.map((chapter) => {
            const totalChLvl = chapter.levels.length;
            const completedChLvl = chapter.levels.filter(l => isCompleted(l.levelId)).length;
            const percent = Math.round((completedChLvl / totalChLvl) * 100);

            return (
              <div 
                key={chapter.id} 
                onClick={() => navigate(`/chapter/${chapter.id}`)}
                style={{
                  background: 'var(--bg-paper)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 12,
                  padding: 24,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: 18, color: 'var(--text-ink)' }}>{t(chapter.title, language)}</h3>
                  <div style={{ fontSize: 14, color: 'var(--text-ink-light)' }}>
                    {totalChLvl} Lessons
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                  <div style={{ width: 100, height: 6, background: 'var(--bg-paper-darker)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${percent}%`, height: '100%', background: 'var(--brand)', borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: percent === 100 ? 'var(--success)' : 'var(--brand)', width: 40, textAlign: 'right' }}>
                    {percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
