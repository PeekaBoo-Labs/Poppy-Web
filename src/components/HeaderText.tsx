export default function HeaderText({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
      <span className={`headerText ${className}`}>{children}</span>
    )
  }
  