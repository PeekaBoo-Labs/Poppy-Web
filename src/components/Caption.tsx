export default function Caption({ children }: { children?: React.ReactNode }) {
  return (
    <span className="caption text-center mb-10 px-10">{children}</span>
  )
}