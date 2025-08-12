'use client'

import { Clock, Save } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import type { Prisma } from '@/generated/prisma'
import { cn } from '@/lib/utils'
import { formatPhone } from '@/utils/format-phone'
import { updateProfile } from '../../_actions/update-profile'
import { generateTimeSlots } from '../../_utils/generate-time-slots'
import { getBrazilTimezones } from '../../_utils/get-brazil-timezones'
import { type ProfileFormType, useProfileForm } from '../profile-form'

type UserWithSubscription = Prisma.UserGetPayload<{ include: { subscription: true } }>

interface ProfileContentProps {
  user: UserWithSubscription
}

export function ProfileContent({ user }: ProfileContentProps) {
  const [selectedTimes, setSelectedTimes] = useState<string[]>(user.times ?? [])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status,
    timezone: user.timezone,
  })

  async function handleProfileForm(formData: ProfileFormType) {
    // Chamada da Server Action updateProfile
    const response = await updateProfile({
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      status: formData.status === 'active',
      timezone: formData.timezone,
      times: selectedTimes || [],
    })

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.message)
  }

  const hours = generateTimeSlots({
    startHour: 8,
    endHour: 24,
    intervalMinutes: 30,
  })

  function toggleHour(hour: string) {
    if (selectedTimes.includes(hour)) {
      setSelectedTimes(selectedTimes.filter(selectedHour => selectedHour !== hour))
    } else {
      setSelectedTimes([...selectedTimes, hour].sort())
    }
  }

  const timezones = getBrazilTimezones()

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleProfileForm)}>
          <Card className="mx-auto lg:max-w-5xl">
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
              <CardDescription>Informações sobre a clínica</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-primary">
                  <Image
                    src={user.image ? user.image : '/user.svg'}
                    alt="Foto de perfil da clínica"
                    priority
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome da clínica" className="text-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o endereço da clínica" className="text-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(00) 00000-0000"
                          className="text-sm"
                          {...field}
                          onChange={e => {
                            const formattedValue = formatPhone(e.target.value)
                            field.onChange(formattedValue)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status da Clínica</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-[50%] text-sm">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Aberta</SelectItem>
                          <SelectItem value="inactive">Fechada</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-2">
                  <Label className="font-semibold">Horários de atendimento</Label>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Clock />
                        Clique aqui para selecionar os horários
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="text-left">
                        <DialogTitle>Horários de atendimento</DialogTitle>
                        <DialogDescription>Selecione os horários de atendimento da clínica</DialogDescription>
                      </DialogHeader>

                      <section className="py-4">
                        <div className="grid grid-cols-5 gap-2">
                          {hours.map(hour => (
                            <Button
                              key={hour}
                              onClick={() => toggleHour(hour)}
                              variant="outline"
                              className={cn(
                                'hover:border-2 hover:border-primary!',
                                selectedTimes.includes(hour) && 'bg-primary! text-foreground hover:bg-primary/90!'
                              )}
                            >
                              {hour}
                            </Button>
                          ))}
                        </div>
                      </section>

                      <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                        <Save />
                        Salvar horários
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>

                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selecione o fuso horário</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full text-sm">
                            <SelectValue placeholder="Defina seu fuso horário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timezones.map(timezone => (
                            <SelectItem key={timezone} value={timezone}>
                              {timezone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-2 w-full" disabled={form.formState.isSubmitting}>
                  <Save />
                  Salvar alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
