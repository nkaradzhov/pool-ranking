import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'
import HistoryIcon from '@material-ui/icons/History'

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Navigation = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  return (
    <Container>
      <BottomNavigation
        value={pathname}
        onChange={(e, value) => {
          history.push(value)
        }}
      >
        <BottomNavigationAction
          label="Home"
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
