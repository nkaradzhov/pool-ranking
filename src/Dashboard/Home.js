import React from 'react'
import { auth, firestore } from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Loading from '../components/Loading'
import { Button } from '@material-ui/core'
import UserInfo from '../components/UserInfo'
import styled from 'styled-components'
import Header from '../components/Header'

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`

const Home = () => {
  const [user] = useAuthState(auth())
  const [userInfo, loading] = useDocumentData(
    firestore().doc(`users/${user.uid}`)
  )

  const enroll = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .set({
        rank: 1200,
        displayName: user.providerData[0].displayName,
        email: user.providerData[0].email,
        photoUrl: user.providerData[0].photoURL,
        uid: user.uid,
        gamesLost: 0,
        gamesPlayed: 0,
        gamesWon: 0
      })
  }
  if (loading) return <Loading />
  return (
    <React.Fragment>
      <Header title="HOME" />
      <Page>
        {!userInfo && (
          <React.Fragment>
            <h1>Join our local pool league!</h1>
            <Button onClick={enroll} variant="contained" color="primary">
              ENROLL
            </Button>
          </React.Fragment>
        )}
        {userInfo && <UserInfo info={userInfo} />}
      </Page>
    </React.Fragment>
  )
}

export default Home
