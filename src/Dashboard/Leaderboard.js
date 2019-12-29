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
import { useTrail, animated } from 'react-spring'

const AnimatedListItem = animated(ListItem)

const tryPutRibbon = position => {
  const type = ['gold', 'silver', 'bronze'][position]
  return type ? <Ribbon type={type} /> : null
}

const Leaderboard = () => {
  const users = useDataListener(store =>
    store.collection('users').orderBy('rank', 'desc')
  )
  const history = useHistory()

  const trail = useTrail(users && users.length, {
    config: { mass: 5, tension: 3000, friction: 200 },
    opacity: 1,
    right: '1em',
    from: { opacity: 0, right: '-3em' }
  })

  if (!users) return <Loader />

  return (
    <React.Fragment>
      <Header title="Leaderboard" />
      <ScrollablePaper>
        <List>
          {/* {users.map((user, i) => ( */}
          {trail.map(({ opacity, right }, i) => {
            const user = users[i]
            return (
              <AnimatedListItem
                style={{
                  opacity
                }}
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
                <animated.div
                  style={{
                    right,
                    position: 'absolute'
                  }}
                >
                  <Typography variant="h6" color="textPrimary">
                    {parseInt(user.rank)}
                  </Typography>
                </animated.div>
              </AnimatedListItem>
            )
          })}
        </List>
      </ScrollablePaper>
    </React.Fragment>
  )
}

export default Leaderboard
