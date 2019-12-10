import React from 'react'
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

const Ribbon = ({ type }) => {
  const [text, color] = {
    // gold: ['#1', 'linear-gradient(162deg, #d8b74a 40% , #D4AF37 40%)'],
    gold: ['#1', '#d4af37'],
    silver: ['#2', '#aaa9ad'],
    bronze: ['#3', '#cd7f32']
  }[type]

  return (
    <RibbonRoot>
      <RibbonContent
        style={{
          backgroundColor: color
        }}
      >
        {text}
      </RibbonContent>
    </RibbonRoot>
  )
}

export default Ribbon
