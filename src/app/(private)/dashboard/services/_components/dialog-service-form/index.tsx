import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const serviceFormShema = z.object({
  name: z.string().nonempty('O nome é obrigatório').trim(),
  price: z.string().nonempty('O preço é obrigatório').trim(),
  hours: z.string(),
  minutes: z.string(),
})

export type ServiceFormType = z.infer<typeof serviceFormShema>

export type useProfileFormProps = {
  initialValues?: {
    name: string
    price: string
    hours: string
    minutes: string
  }
}

export function useServiceForm() {
  return useForm<ServiceFormType>({
    shouldUnregister: true,
    resolver: zodResolver(serviceFormShema),
    defaultValues: {
      name: '',
      price: '',
      hours: '',
      minutes: '',
    },
  })
}
