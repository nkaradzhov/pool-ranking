import React, { useState } from 'react'
import { auth } from 'firebase'
import Loader from './components/Loading'
import Header from './components/Header'
import ScrollablePaper from './components/ScrollablePaper'
import Moment from 'react-moment'
import { List, ListItem, ListItemText } from '@material-ui/core'
import GP from './components/GamePoints'
import { useAuthState } from 'react-firebase-hooks/auth'
import useDataListener from './store/useDataListener'

const GamePoints = ({ ...rest }) => (
  <strong>
    <GP {...rest} />
  </strong>
)

const yesterday = Date.now() - 3 * 24 * 60 * 60 * 1000

const GameHistory = () => {
  const [user] = useAuthState(auth())
  const games = useDataListener(store =>
    store
      .collection('games')
      // .where('date', '>', yesterday)
      .limit(100)
      .orderBy('date', 'desc')
  )

  const [mine, setMine] = useState(false)

  const filteredGames = mine
    ? games.filter(
        game =>
          game.winner === user.displayName || game.looser === user.displayName
      )
    : games

  if (!games) return <Loader />

  return (
    <React.Fragment>
      <Header
        title="Game History"
        right={() => (
          <strong style={{ float: 'right' }} onClick={() => setMine(!mine)}>
            {mine ? 'Mine' : 'All'}
          </strong>
        )}
      />
      <ScrollablePaper>
        <List>
          {filteredGames.map(
            mine
              ? renderMyHistoryItem(user.displayName)
              : renderRegularHistoryItem
          )}
        </List>
      </ScrollablePaper>
    </React.Fragment>
  )
}

export default GameHistory

const renderMyHistoryItem = myName => (game, i) => {
  const [won, gamePoints, vs] =
    myName === game.winner
      ? ['Won', game.points, game.looser]
      : ['Lost', -game.points, game.winner]

  return (
    <ListItem divider key={i}>
      <ListItemText
        primary={
          <React.Fragment>
            <div>
              {`${won} `}
              <GamePoints hideSign points={gamePoints} />
              {` against `}
              <strong> {vs}</strong>
            </div>
          </React.Fragment>
        }
        secondary={<Moment fromNow>{game.date}</Moment>}
      ></ListItemText>
    </ListItem>
  )
}

const renderRegularHistoryItem = (game, i) => (
  <ListItem divider key={i}>
    <ListItemText
      primary={
        <React.Fragment>
          <div>
            <strong>{game.winner}</strong>
            &nbsp;
            <GamePoints points={game.points} />
          </div>
          <div>
            <strong> {game.looser}</strong>
            &nbsp;
            <GamePoints points={-game.points} />
          </div>
        </React.Fragment>
      }
      secondary={<Moment fromNow>{game.date}</Moment>}
    ></ListItemText>
  </ListItem>
)
