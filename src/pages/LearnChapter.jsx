import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import content1 from '../data/content';
import content2 from '../data/content2';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import { t } from '../data/translationEngine';

const allContent = { ...content1, ...content2 };

// Map chapterId to Quest level if exists
const QUEST_MAP = {
  "intro": "1.1",
  "variables": "1.1",
  "conditionals": "2.1",
  "functions": "3.1",
  "scope": "3.4",
  "arrays": "4.1",
  "loops": "5.1",
  "objects": "6.1"
};

export default function LearnChapter() {
  const { chapterId: routeChapterId } = useParams();
  const chapterId = routeChapterId || "intro";
  const navigate = useNavigate();
  const { isCompleted, completeLevel, addXp, language } = useGame();
  const chapterData = allContent[chapterId];
  
  // Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizSuccess, setQuizSuccess] = useState(false);

  // Code Block Tab States
  // Tracks active tab ('basic', 'intermediate', 'realworld') per code section index
  const [codeTabs, setCodeTabs] = useState({});

  useEffect(() => {
    // Scroll to top on chapter change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset Quiz
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizSuccess(false);
    setCodeTabs({});
  }, [chapterId]);

  if (!chapterData) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>{t('chapterNotFound', language)}</h2>
        <button className="btn-run" onClick={() => navigate('/')}>{t('backDashboard', language)}</button>
      </div>
    );
  }

  const handleQuizSubmit = () => {
    if (quizSubmitted) return;
    setQuizSubmitted(true);
    
    const isCorrect = selectedAnswer === chapterData.quiz.correct;
    if (isCorrect) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 }, colors: ['#c084fc', '#34d399'] });
      addXp(20); // Award 20 XP for chapter quiz
      setQuizSuccess(true);
      completeLevel(chapterId); // Mark chapter completed
    } else {
      setQuizSuccess(false);
    }
  };

  const handleCodeTabChange = (sectionIndex, tabName) => {
    setCodeTabs(prev => ({
      ...prev,
      [sectionIndex]: tabName
    }));
  };

  const questLevelId = QUEST_MAP[chapterId];

  return (
    <div style={{ display: 'flex', width: '100%', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
      
      {/* 2. MAIN READING MATERIAL PANEL */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px 30px', boxSizing: 'border-box' }} className="reading-panel">
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: 20, marginBottom: 30, flexWrap: 'wrap', gap: 15 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <div>
              <h1 style={{ fontSize: 32, margin: 0, fontWeight: 800, color: 'var(--text-ink)', fontFamily: "'Playfair Display', serif" }}>{t(chapterData.title, language)}</h1>
              <span style={{ fontSize: 13, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase' }}>JavaScript Masterjoy Syllabus</span>
            </div>
          </div>

          {questLevelId && (
            <button 
              className="btn-run" 
              onClick={() => {
                // Find chapter object key in quests
                // For variables/intro we go to 'intro' chapter
                const questChapterKey = ['intro', 'ifelse', 'functions', 'arrays', 'loops', 'objects'].find(k => k === chapterId || (chapterId === 'variables' && k === 'intro') || (chapterId === 'conditionals' && k === 'ifelse'));
                navigate(`/chapter/${questChapterKey || 'intro'}/${questLevelId}`);
              }}
              style={{
                background: 'var(--text-ink)',
                color: 'var(--bg-paper)',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                cursor: 'pointer',
                letterSpacing: '1px'
              }}
            >
              {t('playQuest', language).replace('⚔️ ', '')}
            </button>
          )}
        </div>

        {/* Dynamic Sections rendering */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: '800px' }}>
          {chapterData.sections.map((section, idx) => {
            switch (section.type) {
              case 'intro':
              case 'what':
              case 'why':
              case 'where':
              case 'when':
                return (
                  <div key={idx} className="story-box" style={{ margin: 0 }}>
                    <div style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: 12, color: 'var(--brand)', marginBottom: 8 }}>
                      {section.type}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: t(section.content, language).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} style={{ fontSize: 16, lineHeight: 1.6 }} />
                  </div>
                );

              case 'code':
                return (
                  <div key={idx} className="scroll-card" style={{ margin: 0 }}>
                    <div className="scroll-title">{t(section.title, language)}</div>
                    
                    {/* Tabs switcher */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 15, borderBottom: '1px solid var(--glass-border)', paddingBottom: 10 }}>
                      {['basic', 'intermediate', 'realworld'].map(tab => {
                        if (!section[tab]) return null;
                        const activeTab = codeTabs[idx] || 'basic';
                        const isActive = activeTab === tab;
                        return (
                          <button
                            key={tab}
                            onClick={() => handleCodeTabChange(idx, tab)}
                            style={{
                              background: isActive ? 'var(--brand)' : 'transparent',
                              border: '1px solid ' + (isActive ? 'var(--brand)' : 'var(--glass-border)'),
                              color: isActive ? 'var(--bg-paper)' : 'var(--text-ink-light)',
                              padding: '6px 14px',
                              borderRadius: 6,
                              fontWeight: 700,
                              fontSize: 12,
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                              transition: 'all 0.2s'
                            }}
                          >
                            {tab === 'realworld' ? 'Real World 🌍' : tab}
                          </button>
                        );
                      })}
                    </div>

                    {/* Active tab content */}
                    {(() => {
                      const activeTab = codeTabs[idx] || 'basic';
                      const codeData = section[activeTab];
                      if (!codeData) return null;
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <pre style={{
                            margin: 0,
                            padding: 16,
                            background: '#070a13',
                            borderRadius: 8,
                            border: '1px solid var(--glass-border)',
                            fontFamily: '"JetBrains Mono", monospace',
                            fontSize: 14,
                            color: '#cbd5e1',
                            overflowX: 'auto',
                            lineHeight: 1.5
                          }}>
                            <code>{codeData.code}</code>
                          </pre>
                          
                          <div style={{ background: 'var(--terminal-bg-dark)', padding: 12, borderRadius: 6, fontSize: 14, color: 'var(--terminal-amber)', borderLeft: '3px solid var(--brand)' }}>
                            <strong>{t('explanation', language)}:</strong> {t(codeData.explanation, language)}
                          </div>

                          <div style={{ background: '#000', padding: 12, borderRadius: 6, fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: 'var(--terminal-green)' }}>
                            <span style={{ color: 'var(--terminal-green-dim)', marginRight: 8 }}>▸ {t('output', language)}:</span>
                            <pre style={{ margin: '5px 0 0 0', fontFamily: 'inherit', color: 'inherit' }}>{codeData.output}</pre>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );

              case 'comparison':
                return (
                  <div key={idx} className="scroll-card" style={{ margin: 0 }}>
                    <div className="scroll-title">{t(section.title, language)}</div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10, fontSize: 14 }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--brand)', textAlign: 'left' }}>
                            {section.table.headers.map((h, i) => (
                              <th key={i} style={{ padding: 12, color: 'var(--brand)', fontWeight: 800 }}>{t(h, language)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} style={{ padding: 12, color: 'var(--tx-2)' }}>{t(cell, language)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );

              case 'timeline':
                return (
                  <div key={idx} className="scroll-card" style={{ margin: 0 }}>
                    <div className="scroll-title">History Timeline</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 15 }}>
                      {section.items.map((item, itemIdx) => (
                        <div key={itemIdx} style={{ display: 'flex', gap: 20, borderLeft: '2px solid var(--brand)', paddingLeft: 20, position: 'relative' }}>
                          <span style={{
                            position: 'absolute',
                            left: -6,
                            top: 4,
                            width: 10,
                            height: 10,
                            background: 'var(--brand)',
                            borderRadius: '50%',
                            boxShadow: 'var(--brand-glow)'
                          }} />
                          <span style={{ fontWeight: 800, color: 'var(--brand)', fontSize: 15, width: 60, flexShrink: 0 }}>{item.year}</span>
                          <span style={{ color: 'var(--tx-2)', fontSize: 14 }}>{t(item.event, language)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case 'mistakes':
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, margin: '10px 0 0 0', color: 'var(--text-ink)', fontFamily: "'Outfit', sans-serif" }}>{t('commonMistakes', language)}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 15 }}>
                      {section.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="scroll-card" style={{ margin: 0, border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                            <span style={{ color: 'var(--error)', fontWeight: 800 }}>❌ {t('wrong', language)}: <code>{item.wrong}</code></span>
                            <span style={{ color: 'var(--success)', fontWeight: 800 }}>✅ {t('right', language)}: <code>{item.right}</code></span>
                          </div>
                          <div style={{ fontSize: 14, color: 'var(--tx-2)', borderTop: '1px solid var(--glass-border)', paddingTop: 8, marginTop: 8 }}>
                            <strong>{t('reason', language)}:</strong> {t(item.reason, language)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case 'interview':
                return (
                  <div key={idx} className="scroll-card" style={{ margin: 0, border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                    <div className="scroll-title" style={{ color: 'var(--warning)' }}>{t('interviewQuestions', language)}</div>
                    <ul style={{ margin: '10px 0 0 0', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {section.questions.map((q, qIdx) => (
                        <li key={qIdx} style={{ color: 'var(--tx-2)', fontSize: 14 }}>{t(q, language)}</li>
                      ))}
                    </ul>
                  </div>
                );

              case 'summary':
                return (
                  <div key={idx} className="scroll-card" style={{ margin: 0, border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                    <div className="scroll-title" style={{ color: 'var(--success)' }}>{t('summaryChecklist', language)}</div>
                    <ul style={{ margin: '10px 0 0 0', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {section.points.map((p, pIdx) => (
                        <li key={pIdx} style={{ color: 'var(--tx-2)', fontSize: 14 }}>{t(p, language)}</li>
                      ))}
                    </ul>
                  </div>
                );

              default:
                return null;
            }
          })}

          {/* 3. CHAPTER QUIZ SECTION */}
          {chapterData.quiz && (
            <div className="scroll-card" style={{ margin: '20px 0 0 0', border: '1px solid var(--brand)', boxShadow: '0 0 10px rgba(192, 132, 252, 0.15)' }}>
              <div className="scroll-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{t('chapterTest', language)}</span>
                <span style={{ fontSize: 12, background: 'rgba(192, 132, 252, 0.2)', padding: '4px 10px', borderRadius: 4, color: 'var(--brand)' }}>
                  +20 XP
                </span>
              </div>
              
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-ink)', margin: '15px 0' }}>
                {t(chapterData.quiz.question, language)}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {chapterData.quiz.options.map((option, oIdx) => {
                  const isSelected = selectedAnswer === oIdx;
                  const isCorrect = oIdx === chapterData.quiz.correct;
                  let optStyle = {
                    background: 'var(--bg-paper)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-ink)'
                  };
                  if (quizSubmitted) {
                    if (isCorrect) {
                      optStyle.background = 'var(--success)';
                      optStyle.borderColor = 'var(--success)';
                      optStyle.color = 'var(--bg-paper)';
                    } else if (isSelected) {
                      optStyle.background = 'var(--error)';
                      optStyle.borderColor = 'var(--error)';
                      optStyle.color = 'var(--bg-paper)';
                    }
                  } else if (isSelected) {
                    optStyle.borderColor = 'var(--brand)';
                    optStyle.background = 'var(--text-ink)';
                    optStyle.color = 'var(--bg-paper)';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => !quizSubmitted && setSelectedAnswer(oIdx)}
                      disabled={quizSubmitted}
                      style={{
                        ...optStyle,
                        padding: '12px 16px',
                        borderRadius: 8,
                        textAlign: 'left',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: quizSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {t(option, language)}
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted && (
                <button
                  className="btn-run"
                  onClick={handleQuizSubmit}
                  disabled={selectedAnswer === null}
                  style={{ width: '100%', marginTop: 15, padding: 12, opacity: selectedAnswer === null ? 0.5 : 1 }}
                >
                  {t('submitSpell', language)}
                </button>
              )}

              {quizSubmitted && (
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{
                    color: quizSuccess ? 'var(--success)' : 'var(--error)',
                    fontWeight: 700,
                    fontSize: 15
                  }}>
                    {quizSuccess ? '✅ ' + t(chapterData.quiz.successMessage, language) : '❌ Try again! Correct answer was option: ' + (chapterData.quiz.correct + 1)}
                  </div>

                  {quizSuccess && (
                    <button
                      className="btn-run"
                      onClick={() => {
                        // Find next chapter keys
                        const contentKeys = Object.keys(allContent);
                        const currentIdx = contentKeys.indexOf(chapterId);
                        if (currentIdx < contentKeys.length - 1) {
                          navigate(`/chapter/${contentKeys[currentIdx + 1]}`);
                        } else {
                          navigate('/'); // Done
                        }
                      }}
                      style={{ width: '100%', padding: 12 }}
                    >
                      {t('nextChapter', language)}
                    </button>
                  )}

                  {!quizSuccess && (
                    <button
                      className="btn-run"
                      onClick={() => {
                        setSelectedAnswer(null);
                        setQuizSubmitted(false);
                      }}
                      style={{ width: '100%', padding: 12, background: 'var(--error)' }}
                    >
                      {t('retryQuestion', language)}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
