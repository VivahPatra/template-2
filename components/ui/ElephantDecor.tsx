'use client'

interface Props {
  side?: 'left' | 'right'
  size?: number
}

export default function ElephantDecor({ side = 'left', size = 80 }: Props) {
  const isLeft = side === 'left'
  return (
    <div
      className="absolute bottom-0 pointer-events-none z-10"
      style={{ [isLeft ? 'left' : 'right']: 12 }}
    >
      <img
        src="/assets/elephant.gif"
        alt=""
        style={{
          width: size,
          height: 'auto',
          opacity: 0.6,
          filter: 'brightness(1.1)',
          transform: isLeft ? undefined : 'scaleX(-1)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
