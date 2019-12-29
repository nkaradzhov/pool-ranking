import React from 'react'
import { Toolbar, AppBar } from '@material-ui/core'
import styled from 'styled-components'

const Root = styled(Toolbar)`
  display: flex;
  align-items: stretch;
`

const Left = styled.div`
  display: flex;
  flex: 1;
  background: lime;
  justify-content: flex-start;
`
const Middle = styled.div`
  display: flex;
  flex: 4;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Right = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`

const Header = ({ left, title, right }) => {
  return (
    <AppBar position="static">
      <Root>
        <Left>{left && left()}</Left>
        <Middle>
          {title && typeof title === 'function' ? title() : title}
        </Middle>
        <Right>{right && right()}</Right>
      </Root>
    </AppBar>
  )
}

export default Header
