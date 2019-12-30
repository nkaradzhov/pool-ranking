import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'

const RecordButton = styled(animated(Fab))`
  position: absolute !important;
  bottom: 4.3rem !important;
  right: 1.3rem !important;
`
const isBlackList = pathname => !['/leaderboard', '/history'].includes(pathname)

export default () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const [props, set] = useSpring(() => ({
    val: 0,
    config: { tension: 400, friction: 30 }
  }))
  useEffect(() => {
    set(isBlackList(pathname) ? { val: 0 } : { val: 1 })
  }, [pathname, set])

  return (
    <RecordButton
      style={{
        opacity: props.val.interpolate(val => val),
        transform: props.val.interpolate(val => `scale(${val})`)
      }}
      onClick={() => history.push('/record')}
      color="primary"
    >
      <AddIcon />
    </RecordButton>
  )
}
