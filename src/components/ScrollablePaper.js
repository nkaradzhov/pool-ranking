import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const ScrollablePaper = styled(Paper)`
  overflow: scroll;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${grey[50]} !important;
`

export default ScrollablePaper
