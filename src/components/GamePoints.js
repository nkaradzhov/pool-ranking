import React from 'react'
import { red, green } from '@material-ui/core/colors'

const GamePoints = ({ points }) => {
  const [sign, color] = points > 0 ? ['+', green[500]] : ['-', red[500]]
  return (
    <span style={{ color: color }}>
      {sign}
      {Math.abs(parseInt(points))}
    </span>
  )
}

export default GamePoints
