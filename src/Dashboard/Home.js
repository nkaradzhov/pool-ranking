import React from 'react'
import { auth, firestore } from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Loading from '../components/Loading'
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`

const ProfilePic = styled(Avatar)`
  width: 80px !important;
  height: 80px !important;
`

const Label = styled.span`
  font-size: 0.8em;
  color: #444343;
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
        uid: user.uid
      })
  }
  if (loading) return <Loading />
  return (
    <Container>
      {!userInfo && <button onClick={enroll}>enroll</button>}
      {userInfo && (
        <React.Fragment>
          <ProfilePic src={userInfo.photoUrl} />
          <h3>{userInfo.displayName}</h3>
          <h1>
            <Label>SKILL:</Label> {parseInt(userInfo.rank)}
          </h1>
          <h2>
            <Label>W/L RATIO:</Label>{' '}
            {(userInfo.gamesWon / userInfo.gamesLost).toFixed(2)}
          </h2>
          <h2>
            <Label>GAMES PLAYED:</Label> {userInfo.gamesPlayed}
          </h2>
        </React.Fragment>
      )}
    </Container>
  )
}

export default Home
