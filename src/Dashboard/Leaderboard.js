import React from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
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
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

const Delta = ({ delta }) => (
  <small
    style={{
      color: delta < 0 ? red[500] : green[500]
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
      <Header title="Leaderboard" />
      <ScrollablePaper>
        <List>
          {users.map((user, i) => (
            <ListItem
              divider
              key={user.uid}
              onClick={() => history.push(`/profile/${user.uid}`)}
            >
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
                <Delta delta={user.delta} />
              </div>
            </ListItem>
          ))}
        </List>
      </ScrollablePaper>
    </React.Fragment>
  )
}

export default Leaderboard
