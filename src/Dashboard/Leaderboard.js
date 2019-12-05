import React from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from '../components/Loading'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemText'

const Delta = ({ delta }) => (
  <small
    style={{
      marginLeft: '.2rem',
      color: delta < 0 ? 'red' : 'green'
    }}
  >
    {`( ${delta > 0 ? '+' : ''}${delta | 0} )`}
  </small>
)

const Leaderboard = () => {
  const [users, loading] = useCollectionData(
    firestore()
      .collection('users')
      .orderBy('rank', 'desc')
  )
  if (loading) return <Loader />
  return (
    <List>
      {users.map((user, i) => (
        <ListItem key={i}>
          <ListItemAvatar>
            <Avatar src={user.photoUrl} />
          </ListItemAvatar>
          <ListItemText primary={user.displayName} />
          <ListItemSecondaryAction
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <strong>{parseInt(user.rank)}</strong>
            <Delta delta={user.delta} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

export default Leaderboard
