import React from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import Loader from '../components/Loading'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemText'
import Header from '../components/Header'

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
  const history = useHistory()
  if (loading) return <Loader />
  return (
    <React.Fragment>
      <Header title="LEADERBOARD" />
      <List style={{ overflow: 'scroll' }}>
        {users.map((user, i) => (
          <ListItem
            key={i}
            onClick={() => history.push(`/profile/${user.uid}`)}
          >
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
    </React.Fragment>
  )
}

export default Leaderboard
