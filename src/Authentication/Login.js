import React from 'react'
import Loading from '../components/Loading'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'firebase'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const Login = () => {
  const [user, loading] = useAuthState(auth())

  if (user) return <Redirect to="/" />

  if (loading) return <Loading />
  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          auth().signInWithRedirect(new auth.FacebookAuthProvider())
        }
      >
        Sign in with Facebook
      </Button>
    </Container>
  )
}

export default Login
