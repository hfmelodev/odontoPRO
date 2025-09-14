import { Crown } from 'lucide-react'

export function PremiumBadge() {
  return (
    <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 font-semibold text-white text-xs shadow-md">
      <Crown className="h-4 w-4" />
      PRO
    </div>
  )
}
