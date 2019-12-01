import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AddIcon from '@material-ui/icons/Add'
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import HistoryIcon from '@material-ui/icons/History'

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
`
const RecordButton = styled(Fab)`
  align-self: flex-end;
  margin: 1rem !important;
`

const Navigation = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  return (
    <Container>
      <RecordButton onClick={() => history.push('/record')} color="primary">
        <AddIcon />
      </RecordButton>
      <BottomNavigation
        value={pathname}
        onChange={(e, value) => {
          console.log(value)
          history.push(value)
        }}
      >
        <BottomNavigationAction
          label="Dashboard"
          value="/"
          icon={<AccountCircleIcon />}
        />
        <BottomNavigationAction
          label="Leaderboard"
          value="/leaderboard"
          icon={<SupervisorAccountIcon />}
        />
        <BottomNavigationAction
          label="History"
          value="/history"
          icon={<HistoryIcon />}
        />
      </BottomNavigation>
    </Container>
  )
}

export default Navigation
