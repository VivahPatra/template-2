'use client'

export default function EleWalk() {
  return (
    <div className="absolute bottom-4 pointer-events-none z-10 overflow-hidden"
      style={{ left: '50%', transform: 'translateX(-50%)', width: '100vw' }} aria-hidden>
      <style>{`
        @keyframes eleWalkLR {
          0%   { transform: translateX(-150px); }
          100% { transform: translateX(calc(100vw + 50px)); }
        }
        @keyframes eleStepAnim {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25%       { transform: translateY(-3px) rotate(-1deg); }
          50%       { transform: translateY(0) rotate(0deg); }
          75%       { transform: translateY(-3px) rotate(1deg); }
        }
        @keyframes eleShadowAnim {
          0%, 100% { transform: scaleX(1); opacity: 0.2; }
          25%, 75% { transform: scaleX(0.85); opacity: 0.12; }
        }
      `}</style>
      {/* Left to right */}
      <div style={{ animation: 'eleWalkLR 20s linear infinite' }}>
        <div style={{ animation: 'eleStepAnim 0.8s ease-in-out infinite' }}>
          <img src="/assets/ele.png" alt="" style={{ width: 100, height: 'auto', opacity: 0.7, filter: 'brightness(1.1) drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
        </div>
        <div style={{ width: 80, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.15)', margin: '-4px auto 0', filter: 'blur(3px)', animation: 'eleShadowAnim 0.8s ease-in-out infinite' }} />
      </div>
      {/* Right to left */}
      <div style={{ animation: 'eleWalkLR 24s linear infinite reverse', animationDelay: '10s' }}>
        <div style={{ animation: 'eleStepAnim 0.8s ease-in-out infinite' }}>
          <img src="/assets/ele.png" alt="" style={{ width: 85, height: 'auto', opacity: 0.5, filter: 'brightness(1.1) drop-shadow(0 4px 6px rgba(0,0,0,0.3))', transform: 'scaleX(-1)' }} />
        </div>
      </div>
    </div>
  )
}
