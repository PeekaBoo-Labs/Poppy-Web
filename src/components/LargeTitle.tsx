export default function LargeTitle({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
      <span className={`largeTitle ${className}`}>{children}</span>
    )
  }
  