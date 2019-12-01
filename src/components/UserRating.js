import React from 'react'
import { firestore, auth } from 'firebase'
import { useDocument } from 'react-firebase-hooks/firestore'

const UserRating = ({ uid }) => {
  const [rating, loading, error] = useDocument(
    firestore().doc(`ratings/${uid}`)
  )

  if (!loading && !rating) {
    firestore()
      .doc(`ratings/${uid}`)
      .set({
        foo: 'bar'
      })
  }

  return <div></div>
}

export default UserRating
