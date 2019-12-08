import React from 'react'
import styled, { css } from 'styled-components'
import FitText from 'react-fittext'
import { grey } from '@material-ui/core/colors'
import GamePoints from './GamePoints'
import GamePointsSummary from './GamePointsSummary'

const border = `2px solid ${grey[200]}`
const titleColor = grey[700]
const color = grey[900]
const bgColor = grey[50]

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex: 1;
`
const Row = styled.div`
  display: flex;
  ${props => css`
    flex: ${props.flex || 1};
  `}
  border-bottom: ${border};
  &:last-child {
    border-bottom: 0;
  }
`
const CardRoot = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-right: ${border};
  ${props => css`
    flex: ${props.flex};
  `}

  &:last-child {
    border-right: 0;
  }
`

const CardContent = styled.div`
  background: ${bgColor};
  color: ${color};
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  flex: 1;
  font-weight: 400;
`
const CardTitle = styled.small`
  position: absolute;
  top: 1em;
  left: 1em;
  font-size: 1em;
  font-weight: bold;
  color: ${titleColor};
`

const Card = ({ flex = 1, compressor = 0.3, children, title }) => {
  return (
    <CardRoot flex={flex}>
      <FitText compressor={compressor}>
        <CardContent after={title}>{children}</CardContent>
      </FitText>
      <CardTitle>{title}</CardTitle>
    </CardRoot>
  )
}

const UserInfo = ({ info }) => (
  <Grid>
    <Row flex={2}>
      <Card flex={2} title="Rank">
        {parseInt(info.rank)}
      </Card>
    </Row>
    <Row>
      <Card title="Last Game">
        <GamePoints points={info.delta} />
      </Card>
      <Card title="Last Week">
        <GamePointsSummary name={info.displayName} />
      </Card>
    </Row>
    <Row>
      <Card title="Total Games">{info.gamesPlayed}</Card>
      <Card title="Win/Loss">
        {(info.gamesWon / info.gamesLost).toFixed(1)}
      </Card>
    </Row>
    <Row>
      <Card title="Games Won">{info.gamesWon}</Card>
      <Card title="Games Lost">{info.gamesLost}</Card>
    </Row>
  </Grid>
)

export default UserInfo
