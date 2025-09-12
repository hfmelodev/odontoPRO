import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import { type NextRequest, NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_KEY as string,
  api_secret: process.env.CLOUDINARY_SECRET as string,
})

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const file = formData.get('file') as File
  const userId = formData.get('userId') as string

  // Converte o arquivo para um buffer de Uint8Array
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  if (!userId) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 401 })
  }

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    return NextResponse.json({ error: 'Formato de imagem inválido' }, { status: 400 })
  }

  // Envia a imagem para o Cloudinary
  const results: UploadApiResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'image',
          public_id: file.name,
          folder: 'images-odontoPRO',
        },
        (error, result) => {
          if (error) {
            reject(error)
            return
          }

          if (!result) {
            return {
              error: 'Ocorreu um erro ao enviar a imagem',
              status: 500,
            }
          }
          // Retorna o resultado da upload
          resolve(result)
        }
      )
      // Envia o buffer para o Cloudinary
      .end(buffer)
  })

  results

  return NextResponse.json({ url: results.secure_url }, { status: 200 })
}
