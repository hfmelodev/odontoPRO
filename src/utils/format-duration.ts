export function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}min`

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`
}
