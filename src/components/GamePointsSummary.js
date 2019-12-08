import React, { useState } from 'react'
import { firestore } from 'firebase'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import GamePoints from './GamePoints'

const GamePointsSummary = ({ name }) => {
  const [week] = useState(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const [games, loading] = useCollectionDataOnce(
    firestore()
      .collection('games')
      .where('date', '>', week)
  )

  if (loading) return null

  const points = games.reduce((acc, game) => {
    if (game.winner === name) return acc + game.points
    if (game.looser === name) return acc - game.points
    return acc
  }, 0)

  return <GamePoints points={points} />
}

export default GamePointsSummary
