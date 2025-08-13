import { getAllUserServices } from '../../_dal/get-all-user-services'
import { ServiceList } from '../service-list'

type ServiceContentProps = {
  userId: string
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const { services } = await getAllUserServices({ userId })

  return <ServiceList services={services || []} />
}
