import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session) {
    return NextResponse.json(
      {
        error: 'Usuário não autenticado',
      },
      { status: 401 }
    )
  }

  const { searchParams } = request.nextUrl
  const dateString = searchParams.get('date') as string

  if (!dateString) {
    return NextResponse.json(
      {
        error: 'Data não informada',
      },
      { status: 400 }
    )
  }

  const clinicId = session.user.id

  if (!clinicId) {
    return NextResponse.json(
      {
        error: 'Usuário não encontrada',
      },
      { status: 404 }
    )
  }

  try {
    const [year, month, day] = dateString.split('-').map(Number)

    const startDate = new Date(year, month - 1, day, 0, 0, 0)
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999)

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: clinicId,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
    })

    return NextResponse.json(appointments, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      {
        error: 'Erro ao buscar agendamentos',
      },
      { status: 500 }
    )
  }
}
