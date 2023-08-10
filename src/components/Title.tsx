export default function Title({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
      <span className={`title ${className}`}>{children}</span>
    )
  }
  