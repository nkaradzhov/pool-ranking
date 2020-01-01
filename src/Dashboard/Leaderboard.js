import React from 'react'
import { useHistory } from 'react-router-dom'
import Loader from '../components/Loading'
import Avatar from '@material-ui/core/Avatar'
import Header from '../components/Header'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core'
import ScrollablePaper from '../components/ScrollablePaper'
import Ribbon from './Ribbon'
import useDataListener from '../store/useDataListener'
import useFadeIn, { animated } from '../hooks/useFadeIn'

const tryPutRibbon = position => {
  const type = ['gold', 'silver', 'bronze'][position]
  return type ? <Ribbon type={type} /> : null
}

const Anim = animated(ScrollablePaper)

const Leaderboard = () => {
  const users = useDataListener(store =>
    store.collection('users').orderBy('rank', 'desc')
  )
  const history = useHistory()
  const style = useFadeIn()

  if (!users) return <Loader />

  return (
    <React.Fragment>
      <Header title="Leaderboard" />
      <Anim style={style}>
        <List>
          {users.map((user, i) => (
            <ListItem
              divider
              key={user.uid}
              onClick={() => history.push(`/profile/${user.uid}`)}
            >
              {tryPutRibbon(i)}
              <ListItemAvatar>
                <Avatar src={user.photoUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <strong>
                    {i + 1}. {user.displayName}
                  </strong>
                }
                secondary={
                  <React.Fragment>
                    {` Total: ${user.gamesPlayed}`}
                    {`, Win: ${user.gamesWon}`}
                    {`, Loss: ${user.gamesLost}`}
                  </React.Fragment>
                }
              ></ListItemText>
              <div>
                <Typography variant="h6" color="textPrimary">
                  {parseInt(user.rank)}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      </Anim>
    </React.Fragment>
  )
}

export default Leaderboard
