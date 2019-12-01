import React from 'react'
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
import GameHistory from './GameHistory'
import Auth from './Authentication/Auth'
import Navigation from './components/Navigation'

const firebaseApp = app.initializeApp(config)
window.store = firebaseApp.firestore()

const App = () => {
  const [user, loading] = useAuthState(firebaseApp.auth())

  if (loading) return <Loading />

  return (
    <Router>
      <Auth user={user} />
      <Switch>
        <Route path="/login" exact component={Login} />
        {user && (
          <React.Fragment>
            <Route path="/" exact component={Home} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/record" component={RecordGame} />
            <Route exact path="/history" component={GameHistory} />
          </React.Fragment>
        )}
      </Switch>
      <Navigation />
    </Router>
  )
}

export default App
