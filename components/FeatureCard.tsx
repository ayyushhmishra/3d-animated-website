type Props = {
  title: string
  desc: string
}

export default function FeatureCard({ title, desc }: Props) {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground p-4 shadow-sm transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring"
      role="article"
      aria-label={title}
      tabIndex={0}
    >
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm text-foreground/80 leading-relaxed mt-1">{desc}</p>
    </div>
  )
}
