'use client'

import { PlusCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { convertRealToCents } from '@/utils/convert-currency'
import { createService } from '../../_actions/create-service'
import { type ServiceFormType, useServiceForm } from '../dialog-service-form'

type DialogServiceProps = {
  setIsDialogOpen: (open: boolean) => void
}

export function DialogService({ setIsDialogOpen }: DialogServiceProps) {
  const form = useServiceForm()

  async function handleCreateService(formData: ServiceFormType) {
    const priceInCents = convertRealToCents({
      amount: formData.price,
    })

    const hours = parseInt(formData.hours) || 0
    const minutes = parseInt(formData.minutes) || 0

    // Converte as horas e minutos para duração total em minutos
    const duration = hours * 60 + minutes

    const response = await createService({
      name: formData.name,
      price: priceInCents,
      duration,
    })

    console.log(response)

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.message)
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target

    // Remove tudo que não é dígito
    value = value.replace(/\D/g, '')

    if (value) {
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(parseInt(value, 10) / 100)

      event.target.value = formatted
      form.setValue('price', formatted)
    } else {
      event.target.value = ''
      form.setValue('price', '')
    }
  }

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Adicionar um novo serviço</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateService)} className="space-y-5">
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do serviço" className="text-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Preço</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o valor do serviço" className="text-sm" {...field} onChange={changeCurrency} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-sm">Defina o tempo de duração do serviço:</p>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Horas" className="text-sm" type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Minutos" className="text-sm" type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={form.formState.isSubmitting}
            onClick={() => setIsDialogOpen(false)}
          >
            <PlusCircle />
            Adicionar serviço
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}
