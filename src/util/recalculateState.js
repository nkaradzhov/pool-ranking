import { firestore } from 'firebase'
import { calculateRankings } from './elo'

window.recalculateState = async () => {
  const store = firestore()
  const users = (await store.collection('users').get()).docs.reduce(
    (all, user) => ({
      ...all,
      [user.data().displayName]: {
        id: user.id,
        rank: 1200,
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0
      }
    }),
    {}
  )

  const games = (
    await store
      .collection('games')
      .orderBy('date')
      .get()
  ).docs

  const batch = store.batch()

  games.forEach(game => {
    const data = game.data()
    const winner = users[data.winner]
    const looser = users[data.looser]
    const [nw, nl] = calculateRankings(winner.rank, looser.rank)
    const points = nw - winner.rank

    winner.rank = nw
    looser.rank = nl

    winner.gamesPlayed++
    looser.gamesPlayed++

    winner.gamesWon++
    looser.gamesLost++

    batch.update(store.collection('games').doc(game.id), {
      points
    })
  })

  console.log(users)
  Object.values(users).forEach(
    ({ id, gamesPlayed, gamesWon, gamesLost, rank }) => {
      batch.update(store.collection('users').doc(id), {
        gamesPlayed,
        gamesWon,
        gamesLost,
        rank
      })
    }
  )

  batch.commit()
}
