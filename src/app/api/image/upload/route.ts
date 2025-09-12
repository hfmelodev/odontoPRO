import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const file = formData.get('file') as File
  const userId = formData.get('userId') as string

  console.log({
    file,
    userId,
  })

  return NextResponse.json({ file, userId })
}
