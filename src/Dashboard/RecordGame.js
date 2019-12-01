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
    const currentUserRef = firestore()
      .collection('users')
      .doc(authUser.uid)
    const oponentRef = firestore()
      .collection('users')
      .doc(oponent.uid)

    const myRating = (await currentUserRef.get()).data().rating
    const oponentRating = (await oponentRef.get()).data().rating

    let myNewRanking
    let newOponentRanking
    if (won) {
      ;[myNewRanking, newOponentRanking] = calculateRankings(
        myRating,
        oponentRating
      )
    } else {
      ;[newOponentRanking, myNewRanking] = calculateRankings(
        oponentRating,
        myRating
      )
    }

    currentUserRef.update({
      rating: myNewRanking
    })
    oponentRef.update({
      rating: newOponentRanking
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
