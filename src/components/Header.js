import React from 'react'
import { Toolbar, AppBar } from '@material-ui/core'
import styled from 'styled-components'

const Left = styled.div`
  flex: 1;
`
const Middle = styled.div`
  font-weight: bold;
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
        <Middle>{title}</Middle>
        <Right>{right && right()}</Right>
      </Toolbar>
    </AppBar>
  )
}

export default Header
