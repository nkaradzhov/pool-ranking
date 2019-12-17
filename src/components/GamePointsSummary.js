import React, { useState } from 'react'
import GamePoints from './GamePoints'
import useDataListener from '../store/useDataListener'

const week = Date.now() - 7 * 24 * 60 * 60 * 1000
const GamePointsSummary = ({ name }) => {
  const games = useDataListener(store =>
    store.collection('games').where('date', '>', week)
  )

  if (!games) return null

  const points = games.reduce((acc, game) => {
    if (game.winner === name) return acc + game.points
    if (game.looser === name) return acc - game.points
    return acc
  }, 0)

  return <GamePoints points={points} />
}

export default GamePointsSummary
