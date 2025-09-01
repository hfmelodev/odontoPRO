import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const userId = searchParams.get('userId')
  const dateParam = searchParams.get('date')

  if (!userId || userId === 'null' || !dateParam || dateParam === 'null') {
    return NextResponse.json({ error: 'Nenhum agendamento encontrado' }, { status: 400 })
  }

  try {
    const [year, month, day] = dateParam.split('-').map(Number)
    const startDate = new Date(year, month - 1, day, 0, 0, 0)
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999)

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'Nenhum agendamento encontrado' }, { status: 400 })
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
    })

    // Set guarda apenas valores únicos (não permite duplicados)
    // Aqui vamos usar para armazenar os horários que já estão ocupados
    const blockedSlots = new Set<string>()

    for (const apt of appointments) {
      // Calcula quantos blocos de 30min o serviço ocupa
      // Ex: duração 90min → 90/30 = 3 blocos
      const requiredSlots = Math.ceil(apt.service.duration / 30)

      // Descobre a posição (índice) do horário inicial dentro da agenda
      // Ex: ["09:00","09:30","10:00"].indexOf("09:30") → 1
      const startIndex = user.times.indexOf(apt.time)

      // Se o horário inicial existir na agenda
      if (startIndex !== -1) {
        // Percorre todos os blocos necessários
        for (let i = 0; i < requiredSlots; i++) {
          // Pega o horário correspondente ao bloco atual. Ex: "09:30"
          const blockedSlot = user.times[startIndex + i]

          // Se existir, adiciona ao Set (sem risco de duplicar)
          if (blockedSlot) {
            blockedSlots.add(blockedSlot)
          }
        }
      }
    }

    // Converte o Set de volta para array para ser usado em outras partes
    const blockedTimes = Array.from(blockedSlots)

    console.log(blockedTimes)

    return NextResponse.json(blockedTimes, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Nenhum agendamento encontrado' }, { status: 400 })
  }
}
