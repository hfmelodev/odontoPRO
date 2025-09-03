'use client'

import { Save } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { createReminder } from '../../_actions/create-reminder'
import { type ReminderFormType, useReminderForm } from './reminder-form'

type ReminderContentProps = {
  setIsDialogOpen: (open: boolean) => void
}

export function ReminderContent({ setIsDialogOpen }: ReminderContentProps) {
  const form = useReminderForm()

  async function handleReminderSubmit(data: ReminderFormType) {
    const response = await createReminder({
      description: data.description,
    })

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.message)
  }

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleReminderSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Insira a descrição do lembrete"
                    className="max-h-52 min-h-30 text-muted-foreground text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full font-semibold"
            onClick={() => setIsDialogOpen(false)}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            <Save />
            Adicionar lembrete
          </Button>
        </form>
      </Form>
    </div>
  )
}
