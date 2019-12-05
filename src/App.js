import React from 'react'
import RecordButton from './components/RecordButton'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from './firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'
import Login from './Authentication/Login'
import Home from './Dashboard/Home'
import Leaderboard from './Dashboard/Leaderboard'
import RecordGame from './Dashboard/RecordGame'
import Profile from './Dashboard/Profile'
import GameHistory from './GameHistory'
import Auth from './Authentication/Auth'
import Navigation from './components/Navigation'
import styled from 'styled-components'

const firebaseApp = app.initializeApp(config)
window.store = firebaseApp.firestore()

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`

const App = () => {
  const [user, loading] = useAuthState(firebaseApp.auth())

  if (loading) return <Loading />

  return (
    <Root>
      <Router>
        <Content>
          <Auth user={user} />
          <Switch>
            <Route path="/login" exact component={Login} />
            {user && (
              <React.Fragment>
                <Route path="/" exact component={Home} />
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route exact path="/record" component={RecordGame} />
                <Route exact path="/history" component={GameHistory} />
                <Route exact path="/profile/:id" component={Profile} />
              </React.Fragment>
            )}
          </Switch>
        </Content>
        {user && (
          <React.Fragment>
            <RecordButton />
            <Navigation />
          </React.Fragment>
        )}
      </Router>
    </Root>
  )
}

export default App
