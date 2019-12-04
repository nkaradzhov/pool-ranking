import React, { useState } from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './components/Loading'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

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
    <Table>
      <TableHead>
        {games.map((game, i) => (
          <TableRow key={i}>
            <TableCell>{game.winner}</TableCell>
            <TableCell>{game.looser}</TableCell>
          </TableRow>
        ))}
      </TableHead>
    </Table>
  )
}

export default GameHistory
