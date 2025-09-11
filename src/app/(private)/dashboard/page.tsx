import { CalendarPlus } from 'lucide-react'
import Link from 'next/link'
import { LabelSubscription } from '@/components/app/label-subscription'
import { LabelTrial } from '@/components/app/label-trial'
import { Button } from '@/components/ui/button'
import getSession from '@/lib/session'
import { Appointments } from './_components/appointments'
import { ButtonCopyLink } from './_components/button-copy-link'
import { Reminders } from './_components/reminders'
import { checkSubscription } from './plans/_utils/permission/check-subscription'

export default async function Dashboard() {
  const session = await getSession()

  const subscription = await checkSubscription({ userId: session!.user.id })

  return (
    <main>
      {subscription.subscriptionStatus === 'EXPIRED' && <LabelSubscription expired />}

      {subscription.subscriptionStatus === 'TRIAL' && <LabelTrial daysRemaining={subscription.numberMaxDays!} />}

      {subscription.subscriptionStatus !== 'EXPIRED' && (
        <>
          <div className="flex items-center justify-end space-x-2">
            <Button asChild>
              <Link href={`/clinics/${session!.user.id}`} target="_blank" className="text-sm">
                <CalendarPlus />
                Novo agendamento
              </Link>
            </Button>

            <ButtonCopyLink userId={session!.user.id} />
          </div>

          <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* COMPONENT: Agendamentos da clínica */}
            <Appointments userId={session!.user.id} />

            {/* COMPONENT: Lembretes da clínica */}
            <Reminders userId={session!.user.id} />
          </section>
        </>
      )}
    </main>
  )
}
