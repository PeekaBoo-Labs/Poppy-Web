export default function Caption({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <span className={`caption ${className}`}>{children}</span>
  )
}
