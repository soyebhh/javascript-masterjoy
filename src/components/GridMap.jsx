import React from 'react';

const CELL_CSS = {
  wall: 'c-wall', path: 'c-path', trail: 'c-trail',
  player: 'c-player', goal: 'c-goal',
  wrong: 'c-wrong', right: 'c-right',
  'gate-locked': 'c-gate-locked', 'gate-open': 'c-gate-open',
  treasure: 'c-treasure'
};

const CELL_EMOJI = {
  player: '🤖', goal: '⭐', wrong: '❌', right: '🟢',
  'gate-locked': '🔒', 'gate-open': '🔓', treasure: '💎', trail: '✨'
};

export default function GridMap({ grid, dynamicCells }) {
  if (!grid) return null;
  
  const { rows, cols } = grid;
  const displayCells = dynamicCells || grid.cells;

  return (
    <div className="grid-container" style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: '4px',
      background: 'rgba(0,0,0,0.4)',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid var(--glass-border)',
      maxWidth: '100%',
      overflowX: 'auto'
    }}>
      {displayCells.map((type, i) => (
        <div key={i} className={`cell ${CELL_CSS[type] || 'c-wall'}`} style={{
          aspectRatio: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
          background: type === 'wall' ? '#1e293b' : type === 'path' ? '#334155' : type === 'trail' ? '#475569' : '#0f172a',
          borderRadius: '4px',
          boxShadow: type === 'goal' || type === 'treasure' || type === 'right' ? '0 0 10px var(--brand)' : 'none',
          border: type === 'wall' ? '1px solid #0f172a' : '1px solid #475569',
          transition: 'all 0.2s'
        }}>
          {CELL_EMOJI[type] || ''}
        </div>
      ))}
    </div>
  );
}
