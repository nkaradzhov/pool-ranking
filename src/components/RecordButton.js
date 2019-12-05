import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import styled from 'styled-components'

const RecordButton = styled(Fab)`
  position: absolute !important;
  bottom: 4.3rem !important;
  right: 1.3rem !important;
`
const isBlackList = pathname => !['/leaderboard', '/history'].includes(pathname)

export default () => {
  const history = useHistory()
  const { pathname } = useLocation()
  if (isBlackList(pathname)) return null
  return (
    <RecordButton onClick={() => history.push('/record')} color="primary">
      <AddIcon />
    </RecordButton>
  )
}
