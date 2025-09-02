'use client'

import { Link } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

type ButtonCopyLinkProps = {
  userId: string
}

export function ButtonCopyLink({ userId }: ButtonCopyLinkProps) {
  async function handleCopyLink() {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/clinics/${userId}`)
    toast.success('Link copiado para a área de transferência')
  }

  return (
    <Button size="icon" variant="outline" onClick={handleCopyLink}>
      <Link />
    </Button>
  )
}
