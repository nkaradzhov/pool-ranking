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
import { red, green } from '@material-ui/core/colors'

import styled from 'styled-components'

const RibbonRoot = styled.div`
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
`
const RibbonContent = styled.span`
  align-items: center;
  color: white;
  display: flex;
  font-weight: bold;
  justify-content: center;
  left: -1.6em;
  padding: 0.1em 1em;
  position: absolute;
  text-transform: uppercase;
  top: 0.5em;
  transform: rotate(-45deg);
  width: 4em;
  z-index: 99;
`
const Ribbon = ({ text, ...rest }) => (
  <RibbonRoot>
    <RibbonContent {...rest}>{text}</RibbonContent>
  </RibbonRoot>
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
              {i === 0 && (
                <Ribbon text="top 1" style={{ backgroundColor: red[500] }} />
              )}
              {i < 3 && i > 0 && (
                <Ribbon text="top 3" style={{ backgroundColor: green[500] }} />
              )}
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
      </ScrollablePaper>
    </React.Fragment>
  )
}

export default Leaderboard
