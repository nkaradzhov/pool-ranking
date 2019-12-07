import React, { useState } from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './components/Loading'
import Header from './components/Header'
import ScrollablePaper from './components/ScrollablePaper'
import Moment from 'react-moment'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core'

const GameHistory = () => {
  const [yesterday] = useState(Date.now() - 5 * 24 * 60 * 60 * 1000)
  const [games, loading] = useCollectionData(
    firestore()
      .collection('games')
      .where('date', '>', yesterday)
      .orderBy('date', 'desc')
  )

  if (loading) return <Loader />

  return (
    <React.Fragment>
      <Header title="Game History" />
      <ScrollablePaper>
        <List>
          {games.map((game, i) => (
            <ListItem divider key={i}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <strong>{game.winner} </strong>
                    <span> beat </span>
                    <strong> {game.looser}</strong>
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
