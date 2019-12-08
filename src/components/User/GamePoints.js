import React from 'react'
import { red, green } from '@material-ui/core/colors'

const GamePoints = ({ points }) => {
  const [sign, color] = points > 0 ? ['+', green[500]] : ['-', red[500]]
  return (
    <div style={{ color: color }}>
      {sign}
      {Math.abs(parseInt(points))}
    </div>
  )
}

export default GamePoints
