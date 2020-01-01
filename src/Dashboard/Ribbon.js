import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

const RibbonRoot = styled.div`
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
`
const RibbonContent = styled(animated.span)`
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
  width: 4em;
  z-index: 99;
`
// transform: rotate(-45deg

const Ribbon = ({ type }) => {
  const { val } = useSpring({
    val: 1,
    from: { val: 0 },
    config: { clamp: true, tension: 400, friction: 30 }
  })

  const [text, background] = {
    gold: [
      '#1',
      'radial-gradient( circle farthest-corner at 10% 20%, rgba(228,118,0,1) 0%, rgba(247,189,2,1) 90% )'
    ],
    silver: [
      '#2',
      'radial-gradient( circle farthest-corner at 10% 20%,  rgba(126,70,195,1) 0%, rgba(156,236,247,1) 90% )'
    ],
    bronze: [
      '#3',
      'radial-gradient( circle 808px at 15.8% 37%,  rgba(234,178,93,1) 0%, rgba(40,39,39,1) 50.7% )'
    ]
  }[type]

  return (
    <RibbonRoot>
      <RibbonContent
        style={{
          background,
          transform: val.interpolate(v => `rotate(-45deg) scale(${v})`)
        }}
      >
        {text}
      </RibbonContent>
    </RibbonRoot>
  )
}

export default Ribbon
