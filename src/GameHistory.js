import React from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './components/Loading'

const chronologically = (g1, g2) => g2.date - g1.date

const GameHistory = () => {
  const [games, loading] = useCollectionData(firestore().collection('games'))
  if (loading) return <Loader />
  return (
    <ul>
      {games.sort(chronologically).map((game, i) => (
        <li key={i}>
          <span>{game.winner}</span>
          <span>VS</span>
          <span>{game.looser}</span>
        </li>
      ))}
    </ul>
  )
}

export default GameHistory
