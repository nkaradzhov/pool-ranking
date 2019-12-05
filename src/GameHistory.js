import React, { useState } from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './components/Loading'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Header from './components/Header'
import ScrollablePaper from './components/ScrollablePaper'
import Moment from 'react-moment'
import styled from 'styled-components'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import grey from '@material-ui/core/colors/grey'
import { List, ListItem } from '@material-ui/core'

const Cell = styled(TableCell)`
  padding: 0.9em 0.3em !important;
  font-size: 0.8em !important;
`

const Li = styled(ListItem)`
  font-size: 0.8em !important;
  padding: 1em 3em !important;
`

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
      <Header title="Game History" />
      <ScrollablePaper>
        <List>
          {games.map((game, i) => (
            <Li key={i}>
              <span>
                <strong>{game.winner} </strong>
                <span> beat </span>
                <strong> {game.looser}</strong>
                <br />
                <small>
                  <Moment fromNow>{game.date}</Moment>
                </small>
              </span>
            </Li>
          ))}
        </List>
        {/* <Table>
          <TableHead>
            {games.map((game, i) => (
              <TableRow key={i}>
                <Cell style={{ color: green[700] }}>{game.winner}</Cell>
                <Cell style={{ color: red[700] }}>{game.looser}</Cell>
                <Cell style={{ color: grey[700] }}>
                  <Moment fromNow>{game.date}</Moment>
                </Cell>
              </TableRow>
            ))}
          </TableHead>
        </Table> */}
      </ScrollablePaper>
    </React.Fragment>
  )
}

export default GameHistory
