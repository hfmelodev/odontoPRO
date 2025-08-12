import { getAllUserServices } from '../../_dal/get-all-user-services'

type ServiceContentProps = {
  userId: string
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getAllUserServices({ userId })

  console.log(services)

  return (
    <main>
      <div>
        <h1>{userId}</h1>
      </div>
    </main>
  )
}
