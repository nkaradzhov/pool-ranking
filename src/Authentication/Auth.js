import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const Auth = ({ user }) => (
  <Route
    render={({ location }) => {
      if (!user && location.pathname !== '/login') {
        console.log('redirect')
        return <Redirect to="/login" />
      }
    }}
  />
)

export default Auth
