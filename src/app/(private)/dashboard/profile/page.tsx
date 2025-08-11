import getSession from '@/lib/session'
import { ProfileContent } from './_components/profile-content'
import { getUserData } from './_dal/get-info-user'

export default async function Profile() {
  const session = await getSession()

  await getUserData({ userId: session!.user.id })

  return <ProfileContent />
}
