import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'

const RecordButton = styled(animated(Fab))`
  position: absolute !important;
  bottom: 4.3rem !important;
  right: 1.3rem !important;
`
const isBlackList = pathname => !['/leaderboard', '/history'].includes(pathname)

export default () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const [toggle, set] = useState(false)
  const transitions = useTransition(toggle, null, {
    from: { x: 7 },
    enter: { x: 0 },
    leave: { x: 7 }
  })
  useEffect(() => {
    set(!isBlackList(pathname))
  }, [pathname])

  return transitions.map(({ item, key, props }) =>
    item ? (
      <RecordButton
        key={key}
        style={{
          transform: props.x.interpolate(x => `translate(${x}em)`)
        }}
        onClick={() => history.push('/record')}
        color="primary"
      >
        <AddIcon />
      </RecordButton>
    ) : null
  )
}
