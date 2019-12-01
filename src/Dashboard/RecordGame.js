import React, { useState } from 'react'
import { firestore, auth } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loader from '../components/Loading'
import { calculateRankings } from '../util/elo'

const RecordGame = () => {
  const [authUser, loadingUser] = useAuthState(auth())
  const [users, loadingUsers] = useCollectionData(
    firestore().collection('users')
  )

  const [oponent, setOponent] = useState(null)

  const doRecordGame = async won => {
    const winnerRef = firestore()
      .collection('users')
      .doc(won ? authUser.uid : oponent.uid)

    const looserRef = firestore()
      .collection('users')
      .doc(won ? oponent.uid : authUser.uid)

    const winner = (await winnerRef.get()).data()
    const looser = (await looserRef.get()).data()

    const [newWinnerRank, newLooserRank] = calculateRankings(
      winner.rank,
      looser.rank
    )

    winnerRef.update({
      rank: newWinnerRank
    })

    looserRef.update({
      rank: newLooserRank
    })

    firestore()
      .collection('games')
      .add({
        winner: winner.displayName,
        looser: looser.displayName,
        date: Date.now()
      })
  }

  if (loadingUser || loadingUsers) return <Loader />
  return (
    <div>
      <h1>Who did you play against?</h1>
      <ul>
        {users
          .filter(u => u.uid !== authUser.uid)
          .map((u, i) => (
            <li onClick={() => setOponent(u)} key={i}>
              {u.displayName}
            </li>
          ))}
      </ul>
      {oponent && (
        <React.Fragment>
          <button onClick={() => doRecordGame(true)}>won</button>
          <button onClick={() => doRecordGame(false)}>lost</button>
        </React.Fragment>
      )}
    </div>
  )
}

export default RecordGame
