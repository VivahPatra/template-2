interface Props {
  fromColor?: string
  toColor?: string
  flip?: boolean
}

export default function WaveDivider({
  fromColor = 'var(--color-bg)',
  toColor = 'var(--color-surface)',
  flip = false,
}: Props) {
  return (
    <div
      className="relative w-full overflow-hidden leading-none"
      style={{ height: 52, background: fromColor, transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: 52 }}
      >
        <path
          d="M0,26 C240,52 480,0 720,26 C960,52 1200,0 1440,26 L1440,52 L0,52Z"
          fill={toColor}
        />
      </svg>
    </div>
  )
}
