import React from 'react'
import { Toolbar } from '@material-ui/core'
import styled from 'styled-components'

const H = styled(Toolbar)``

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
    <H>
      <Left>{left && left()}</Left>
      <Middle>{title}</Middle>
      <Right>{right && right()}</Right>
    </H>
  )
}

export default Header
