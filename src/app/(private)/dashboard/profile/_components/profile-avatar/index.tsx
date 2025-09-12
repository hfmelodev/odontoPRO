'use client'

import { ImageUp, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { User } from '@/generated/prisma'

type ProfileAvatarProps = {
  user: User
}

export function ProfileAvatar({ user }: ProfileAvatarProps) {
  const avatarUrl = user.image

  const [previewImage, setPreviewImage] = useState(avatarUrl)

  return (
    <div className="group relative h-40 w-40 overflow-hidden rounded-full border-2 border-primary">
      <div className="relative flex h-full w-full items-center justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <label
              htmlFor="profile-image"
              className="absolute z-10 cursor-pointer rounded-md bg-primary p-2 opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
              <ImageUp className="text-white" />
            </label>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            <p className="text-white">Alterar foto de perfil</p>
          </TooltipContent>
        </Tooltip>

        <Input id="profile-image" type="file" accept="image/*" className="hidden" />
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
