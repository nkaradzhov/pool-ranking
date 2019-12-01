import React from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from '../components/Loading'

const Leaderboard = () => {
  const [users, loading] = useCollectionData(firestore().collection('users'))
  if (loading) return <Loader />
  return (
    <ul>
      {users
        .sort((r1, r2) => r2.rank - r1.rank)
        .map((user, i) => (
          <li key={i}>
            {user.displayName} {user.rank}
          </li>
        ))}
    </ul>
  )
}

export default Leaderboard
