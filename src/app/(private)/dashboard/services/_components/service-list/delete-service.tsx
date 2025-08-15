'use client'

import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { deleteService } from '../../_actions/delete-service'

export function DeleteService({ serviceId }: { serviceId: string }) {
  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId })

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.message)
  }

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Deletar serviço</DialogTitle>
        <DialogDescription>Tem certeza que deseja deletar esse serviço?</DialogDescription>
      </DialogHeader>

      <Button variant="destructive" className="w-full" onClick={() => handleDeleteService(serviceId)}>
        <Trash />
        Deletar
      </Button>
    </DialogContent>
  )
}
