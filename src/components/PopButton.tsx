import type { MouseEvent, ReactNode } from 'react'

type Tone = 'yellow' | 'ink' | 'paper' | 'pink'

interface PopButtonProps {
  children: ReactNode
  href?: string
  tone?: Tone
  size?: 'sm' | 'md'
  icon?: ReactNode
  download?: boolean
  external?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

export function PopButton({
  children,
  href,
  tone = 'yellow',
  size,
  icon,
  download,
  external,
  onClick,
}: PopButtonProps) {
  const className = [
    'pop',
    tone !== 'yellow' && `pop--${tone}`,
    size === 'sm' && 'pop--sm',
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className="pop-label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon && (
        <span className="pop-icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        {...(download ? { download: '' } : {})}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {inner}
    </button>
  )
}