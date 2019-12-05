import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { firestore } from 'firebase'
import UserInfo from '../components/UserInfo'
import styled from 'styled-components'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`

const Profile = () => {
  const { id } = useParams()
  const history = useHistory()
  const [user, loading] = useDocumentDataOnce(
    firestore()
      .collection('users')
      .doc(id)
  )
  if (loading) return <Loading />
  return (
    <React.Fragment>
      <Header
        left={() => <ArrowBack onClick={() => history.goBack()} />}
        title={user.displayName}
      />
      <Page>
        <UserInfo info={user} />
      </Page>
    </React.Fragment>
  )
}

export default Profile
