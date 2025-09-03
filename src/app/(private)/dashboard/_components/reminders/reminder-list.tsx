'use client'

import { Bell, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { Reminder } from '@/generated/prisma'
import { deleteReminder } from '../../_actions/delete-reminder'
import { ReminderContent } from './reminder-content'

type ReminderListProps = {
  reminders: Reminder[]
}

export function ReminderList({ reminders }: ReminderListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function handleDeleteReminder(reminderId: string) {
    const response = await deleteReminder({ reminderId })

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.message)
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <CardTitle className="flex items-center gap-1.5">
            <Bell className="size-5" />
            Lembretes
          </CardTitle>
          <CardDescription>Confira sua lista de lembretes</CardDescription>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="icon">
              <Plus className="size-5" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader className="text-left">
              <DialogTitle className="flex items-center gap-1.5">
                <Bell className="size-5" />
                Novo lembrete
              </DialogTitle>
              <DialogDescription>Adicione um novo lembrete para sua lista</DialogDescription>
            </DialogHeader>

            <Separator />

            {/* COMPONENT: Novo lembrete */}
            <ReminderContent setIsDialogOpen={setIsDialogOpen} />
          </DialogContent>
        </Dialog>
      </CardHeader>

      <div className="px-2">
        <Separator />
      </div>

      <CardContent>
        {reminders.length === 0 && (
          <p className="text-center text-muted-foreground text-xs lg:text-sm">Você não possui lembretes cadastrados</p>
        )}

        <ScrollArea className="h-[340px] w-full lg:max-h-[calc(100vh-15rem)]">
          <div className="pr-4">
            {reminders.map(reminder => (
              <article key={reminder.id} className="mb-2 flex items-center justify-between rounded-md bg-amber-100 px-3 py-2">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-muted text-sm lg:text-base">{reminder.description}</p>
                  <p className="text-muted/70 text-xs italic">
                    Criado em {reminder.createdAt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="text-amber-900 transition-all duration-300 ease-in-out hover:bg-amber-800!"
                >
                  <Trash2 className="size-5" />
                </Button>
              </article>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
