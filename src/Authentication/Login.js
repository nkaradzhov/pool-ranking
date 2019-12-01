import React from 'react'
import Loading from '../components/Loading'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'firebase'
import { Redirect } from 'react-router-dom'

const Login = () => {
  const [user, loading] = useAuthState(auth())

  if (user) return <Redirect to="/" />

  if (loading) return <Loading />
  return (
    <button
      onClick={() => auth().signInWithRedirect(new auth.FacebookAuthProvider())}
    >
      Sign in with Facebook
    </button>
  )
}

export default Login
