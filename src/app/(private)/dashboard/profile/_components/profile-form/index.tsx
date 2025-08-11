import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const profileFormShema = z.object({
  name: z.string().nonempty('O nome é obrigatório').trim(),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.string(),
  timezone: z.string().nonempty('O fuso horário é obrigatório'),
})

export type ProfileFormType = z.infer<typeof profileFormShema>

export function useProfileForm() {
  return useForm<ProfileFormType>({
    shouldUnregister: true,
    resolver: zodResolver(profileFormShema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      status: 'active',
      timezone: '',
    },
  })
}
