import React from 'react'
import { Toolbar, AppBar, Typography } from '@material-ui/core'
import styled from 'styled-components'

const Left = styled.div`
  flex: 1;
`
const Middle = styled.div`
  display: flex;
  flex: 4;
  justify-content: center;
`
const Right = styled.div`
  flex: 1;
`

const Header = ({ left, title, right }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Left>{left && left()}</Left>
        <Middle>
          <Typography variant="h7">{title}</Typography>
        </Middle>
        <Right>{right && right()}</Right>
      </Toolbar>
    </AppBar>
  )
}

export default Header
