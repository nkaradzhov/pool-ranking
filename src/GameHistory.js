import React, { useState } from 'react'
import { firestore, auth } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './components/Loading'
import Header from './components/Header'
import ScrollablePaper from './components/ScrollablePaper'
import Moment from 'react-moment'
import { List, ListItem, ListItemText, Switch } from '@material-ui/core'
import GamePoints from './components/GamePoints'
import { useAuthState } from 'react-firebase-hooks/auth'

const GameHistory = () => {
  const [user] = useAuthState(auth())
  const [yesterday] = useState(Date.now() - 3 * 24 * 60 * 60 * 1000)
  const [games, loading] = useCollectionData(
    firestore()
      .collection('games')
      .where('date', '>', yesterday)
      .orderBy('date', 'desc')
  )

  const [mine, setMine] = useState(false)

  const filteredGames = mine
    ? games.filter(
        game =>
          game.winner === user.displayName || game.looser === user.displayName
      )
    : games

  if (loading) return <Loader />

  return (
    <React.Fragment>
      <Header
        title="Game History"
        right={() => (
          <Switch
            checked={mine}
            onClick={() => {
              setMine(!mine)
            }}
          />
        )}
      />
      <ScrollablePaper>
        <List>
          {filteredGames.map((game, i) => (
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
          ))}
        </List>
      </ScrollablePaper>
    </React.Fragment>
  )
}

export default GameHistory
