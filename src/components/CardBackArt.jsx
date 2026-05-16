/**
 * Decorative “card back” art (CSS only). Swap for `cardBackImage` in data when you have assets.
 * @param {{ variant?: string }} props
 */
export default function CardBackArt({ variant = 'ember' }) {
  switch (variant) {
    case 'circuit':
      return <CircuitBack />
    case 'prism':
      return <PrismBack />
    case 'goldleaf':
      return <GoldleafBack />
    case 'lattice':
      return <LatticeBack />
    case 'folio':
      return <FolioBack />
    case 'steel':
      return <SteelBack />
    case 'nebula':
      return <NebulaBack />
    case 'ember':
    default:
      return <EmberBack />
  }
}

function EmberBack() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% 100%, rgb(180 83 9 / 0.55), transparent 55%), radial-gradient(circle at 20% 20%, rgb(251 191 36 / 0.25), transparent 40%), radial-gradient(circle at 80% 30%, rgb(220 38 38 / 0.2), transparent 45%), linear-gradient(165deg, rgb(24 24 27) 0%, rgb(9 9 11) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23fff'/%3E%3C/svg%3E")`,
          backgroundSize: '14px 14px',
        }}
      />
    </div>
  )
}

function CircuitBack() {
  return (
    <div className="absolute inset-0 bg-zinc-950">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24px, rgb(6 182 212 / 0.12) 24px, rgb(6 182 212 / 0.12) 25px, transparent 25px),
            linear-gradient(90deg, transparent 24px, rgb(6 182 212 / 0.1) 24px, rgb(6 182 212 / 0.1) 25px, transparent 25px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 0%, rgb(34 211 238 / 0.18), transparent 50%), linear-gradient(180deg, rgb(15 23 42) 0%, rgb(3 7 18) 100%)',
        }}
      />
    </div>
  )
}

function PrismBack() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-950">
      <div
        className="absolute -inset-[40%] opacity-80"
        style={{
          background:
            'conic-gradient(from 210deg at 50% 50%, rgb(139 92 246 / 0.5), rgb(59 130 246 / 0.35), rgb(236 72 153 / 0.45), rgb(34 197 94 / 0.25), rgb(139 92 246 / 0.5))',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/80" />
    </div>
  )
}

function GoldleafBack() {
  return (
    <div className="absolute inset-0 bg-zinc-950">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgb(66 32 6) 0%, rgb(9 9 11) 35%, rgb(24 24 27) 50%, rgb(9 9 11) 65%, rgb(66 32 6) 100%), linear-gradient(to bottom, rgb(234 179 8 / 0.15), transparent 40%, rgb(234 179 8 / 0.08))',
        }}
      />
      <div
        className="absolute inset-3 rounded-xl border border-amber-600/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'repeating-linear-gradient(-45deg, transparent, transparent 8px, rgb(245 158 11 / 0.08) 8px, rgb(245 158 11 / 0.08) 9px)',
        }}
      />
    </div>
  )
}

function LatticeBack() {
  return (
    <div className="absolute inset-0 bg-zinc-950">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgb(63 63 70 / 0.25) 1px, transparent 1px), linear-gradient(rgb(63 63 70 / 0.25) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 40%, rgb(99 102 241 / 0.2), transparent 45%), radial-gradient(circle at 70% 60%, rgb(34 211 238 / 0.12), transparent 40%)',
        }}
      />
    </div>
  )
}

function FolioBack() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgb(69 10 10) 0%, rgb(24 24 27) 12%, rgb(24 24 27) 88%, rgb(69 10 10) 100%), linear-gradient(180deg, rgb(39 39 42) 0%, rgb(9 9 11) 100%)',
        }}
      />
      <div
        className="absolute inset-x-6 top-8 bottom-8 rounded-sm border border-amber-700/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgb(161 98 7 / 0.15) 0 2px, transparent 2px 14px)',
        }}
      />
    </div>
  )
}

function SteelBack() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(125deg, rgb(30 41 59) 0%, rgb(15 23 42) 40%, rgb(30 58 138 / 0.35) 70%, rgb(15 23 42) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          background:
            'linear-gradient(200deg, transparent 40%, rgb(148 163 184 / 0.25) 50%, transparent 60%)',
        }}
      />
    </div>
  )
}

function NebulaBack() {
  return (
    <div className="absolute inset-0 bg-zinc-950">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgb(168 85 247 / 0.35), transparent 42%), radial-gradient(circle at 80% 20%, rgb(236 72 153 / 0.25), transparent 38%), radial-gradient(circle at 50% 90%, rgb(59 130 246 / 0.3), transparent 45%), linear-gradient(180deg, rgb(9 9 11) 0%, rgb(24 24 27) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(9_9_11)_75%)] opacity-70" />
    </div>
  )
}
