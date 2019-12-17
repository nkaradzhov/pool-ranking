import { useState, useEffect } from 'react'
import { firestore } from 'firebase'
import store from './Store'

const useDataListener = makeRef => {
  const ref = makeRef(firestore())
  const [collection, setCollection] = useState(store.listener(ref).data)
  useEffect(() => store.listener(ref).subscribe(setCollection), [ref])
  return collection
}

export default useDataListener
