'use client'

import { ImageUp, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { type ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { User } from '@/generated/prisma'
import { cn } from '@/lib/utils'

type ProfileAvatarProps = {
  user: User
}

export function ProfileAvatar({ user }: ProfileAvatarProps) {
  const avatarUrl = user.image

  const [previewImage, setPreviewImage] = useState(avatarUrl)
  const [isLoadingUpload, setIsLoadingUpload] = useState(false)

  async function handleChangeImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      toast.error('Nenhuma imagem selecionada')
      return
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      toast.error('Formato de imagem inválido', {
        description: 'Somente são aceitos arquivos JPEG e PNG',
      })
      return
    }

    // Realiza a troca do nome da imagem e cria um novo File com o novo nome
    const newFileName = `${user.id}-${file.name}`
    const newFile = new File([file], newFileName, { type: file.type })

    setIsLoadingUpload(true)

    const imageUrl = await handleUploadImage(newFile)
  }

  async function handleUploadImage(image: File): Promise<string | null> {
    try {
      toast.warning('Estamos enviando a imagem, aguarde...')
      await new Promise(resolve => setTimeout(resolve, 2000))

      const formData = new FormData()

      formData.append('file', image)
      formData.append('userId', user.id)

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        toast.error('Ocorreu um erro ao enviar a imagem')
        return null
      }

      toast.success('Imagem alterada com sucesso')

      return response.json()
    } catch (err) {
      console.log(err)
      toast.error('Ocorreu um erro ao enviar a imagem')
      return null
    }
  }

  return (
    <div className="group relative h-40 w-40 overflow-hidden rounded-full border-2 border-primary">
      <div className="relative flex h-full w-full items-center justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <label
              htmlFor="profile-image"
              className={cn(
                'absolute z-10 cursor-pointer rounded-md bg-primary p-2 opacity-0 transition-all duration-300 group-hover:opacity-100',
                {
                  'opacity-100': isLoadingUpload,
                }
              )}
            >
              {isLoadingUpload ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImageUp className="text-white" />}
            </label>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            <p className="text-white">Alterar foto de perfil</p>
          </TooltipContent>
        </Tooltip>

        <Input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleChangeImage} />
      </div>

      {previewImage ? (
        <Image
          src={previewImage}
          alt="Foto de perfil da clínica"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center font-bold text-3xl text-muted-foreground lg:text-4xl">
          {user.name!.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  )
}
