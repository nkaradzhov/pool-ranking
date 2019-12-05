import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'

const ProfilePic = styled(Avatar)`
  width: 80px !important;
  height: 80px !important;
`

const Label = styled.span`
  font-size: 0.8em;
  color: #444343;
`

const UserInfo = ({ info }) => (
  <React.Fragment>
    <ProfilePic src={info.photoUrl} />
    <h1>
      <Label>SKILL:</Label> {parseInt(info.rank)}
    </h1>
    <h2>
      <Label>W/L RATIO:</Label> {(info.gamesWon / info.gamesLost).toFixed(2)}
    </h2>
    <h2>
      <Label>GAMES PLAYED:</Label> {info.gamesPlayed}
    </h2>
  </React.Fragment>
)

export default UserInfo
