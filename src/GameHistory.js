import React from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './components/Loading'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const chronologically = (g1, g2) => g2.date - g1.date

const GameHistory = () => {
  const [games, loading] = useCollectionData(firestore().collection('games'))
  if (loading) return <Loader />
  return (
    <Table>
      <TableHead>
        {games.sort(chronologically).map((game, i) => (
          <TableRow key={i}>
            <TableCell>{game.winner}</TableCell>
            <TableCell>{game.looser}</TableCell>
          </TableRow>
        ))}
      </TableHead>
    </Table>

    // <List>
    // </List>
  )
}

export default GameHistory
