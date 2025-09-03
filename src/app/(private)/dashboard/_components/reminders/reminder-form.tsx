import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const reminderSchema = z.object({
  description: z.string().trim().nonempty('A descrição do lembrete é obrigatória'),
})

export type ReminderFormType = z.infer<typeof reminderSchema>

export function useReminderForm() {
  return useForm<ReminderFormType>({
    shouldUnregister: true,
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      description: '',
    },
  })
}
