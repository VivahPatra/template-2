'use client'

interface Props {
  side?: 'left' | 'right'
  size?: number
}

export default function SwingDecor({ side = 'left', size = 140 }: Props) {
  const isLeft = side === 'left'
  return (
    <div
      className="absolute top-0 pointer-events-none z-10"
      style={{ [isLeft ? 'left' : 'right']: 8 }}
    >
      <style>{`
        @keyframes swingPendulum {
          0%, 100% { transform: rotate(-8deg); }
          50%       { transform: rotate(8deg); }
        }
      `}</style>
      <div style={{
        transformOrigin: isLeft ? 'top left' : 'top right',
        animation: 'swingPendulum 4s ease-in-out infinite',
      }}>
        <img
          src="/assets/swing.png"
          alt=""
          style={{
            width: size,
            height: 'auto',
            filter: 'brightness(1.1)',
            opacity: 0.75,
            transform: isLeft ? undefined : 'scaleX(-1)',
          }}
        />
      </div>
    </div>
  )
}
