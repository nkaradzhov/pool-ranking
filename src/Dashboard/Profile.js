import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { firestore } from 'firebase'
import UserInfo from '../components/UserInfo'
import Page from '../components/Page'

const Profile = () => {
  const { id } = useParams()
  const [user, loading] = useDocumentDataOnce(
    firestore()
      .collection('users')
      .doc(id)
  )
  if (loading) return <Loading />
  return (
    <Page>
      <UserInfo info={user} />
    </Page>
  )
}

export default Profile
