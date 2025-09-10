import { LabelSubscription } from '@/components/app/label-subscription'
import { LabelTrial } from '@/components/app/label-trial'
import { canPermission } from '../../../plans/_utils/permission/can-permission'
import { getAllUserServices } from '../../_dal/get-all-user-services'
import { ServiceList } from '../service-list'

type ServiceContentProps = {
  userId: string
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const { services } = await getAllUserServices({ userId })

  const permissions = await canPermission({ type: 'service' })

  return (
    <>
      {!permissions.hasPermission && <LabelSubscription expired={permissions.expired} />}
      {permissions.planId === 'TRIAL' && <LabelTrial />}
      <ServiceList services={services || []} permission={permissions} />
    </>
  )
}
