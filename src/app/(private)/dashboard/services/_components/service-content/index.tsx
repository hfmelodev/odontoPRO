import { addDays, differenceInDays, isAfter } from 'date-fns'
import { difference } from 'next/dist/build/utils'
import { LabelSubscription } from '@/components/app/label-subscription'
import { LabelTrial } from '@/components/app/label-trial'
import { canPermission } from '../../../plans/_utils/permission/can-permission'
import { TRIAL_DAYS } from '../../../plans/_utils/permission/trial-limits'
import { getAllUserServices } from '../../_dal/get-all-user-services'
import { ServiceList } from '../service-list'

type ServiceContentProps = {
  userId: string
  userCreationDate: string
}

export async function ServiceContent({ userId, userCreationDate }: ServiceContentProps) {
  const { services } = await getAllUserServices({ userId })

  const permissions = await canPermission({ type: 'service' })

  const trialEndDate = addDays(new Date(userCreationDate), TRIAL_DAYS)

  const daysRemaining = differenceInDays(trialEndDate, new Date())

  return (
    <>
      {!permissions.hasPermission && <LabelSubscription expired={permissions.expired} />}
      {permissions.planId === 'TRIAL' && <LabelTrial daysRemaining={daysRemaining} />}
      <ServiceList services={services || []} permission={permissions} />
    </>
  )
}
