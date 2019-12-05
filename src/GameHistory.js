import React, { useState } from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './components/Loading'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Header from './components/Header'

const GameHistory = () => {
  const [yesterday] = useState(Date.now() - 24 * 60 * 60 * 1000)
  const [games, loading] = useCollectionData(
    firestore()
      .collection('games')
      .where('date', '>', yesterday)
      .orderBy('date', 'desc')
  )

  if (loading) return <Loader />

  return (
    <React.Fragment>
      <Header title="GAME HISTORY" />
      <Table style={{ overflow: 'scroll', display: 'flex' }}>
        <TableHead>
          {games.map((game, i) => (
            <TableRow key={i}>
              <TableCell>{game.winner}</TableCell>
              <TableCell>{game.looser}</TableCell>
            </TableRow>
          ))}
        </TableHead>
      </Table>
    </React.Fragment>
  )
}

export default GameHistory
