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

type useProfileFormProps = {
  name: string | null
  address: string | null
  phone: string | null
  status: boolean
  timezone: string | null
}

export function useProfileForm({ name, address, phone, status, timezone }: useProfileFormProps) {
  return useForm<ProfileFormType>({
    shouldUnregister: true,
    resolver: zodResolver(profileFormShema),
    defaultValues: {
      name: name || '',
      address: address || '',
      phone: phone || '',
      status: status ? 'active' : 'inactive',
      timezone: timezone || '',
    },
  })
}
