import React from 'react'
import { firestore } from 'firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import Loader from '../components/Loading'
import Avatar from '@material-ui/core/Avatar'
import Header from '../components/Header'
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core'
import ScrollablePaper from '../components/ScrollablePaper'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import grey from '@material-ui/core/colors/grey'

const scale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] //9

const getBackgroundColor = rank => {
  return ''
  const step = 50
  const diff = rank - 1200

  let steps = Math.abs(parseInt(diff / step))
  if (steps > 9) steps = 9

  const color = diff >= 0 ? green : red
  return color[scale[steps]]
}

const Delta = ({ delta }) => (
  <small
    style={{
      marginLeft: '.2rem',
      fontSize: '0.7em',
      color: delta < 0 ? red[500] : green[500]
      // color: grey[700]
    }}
  >
    {`( ${delta > 0 ? '+' : ''}${delta | 0} )`}
  </small>
)

const Leaderboard = () => {
  const [users, loading] = useCollectionData(
    firestore()
      .collection('users')
      .orderBy('rank', 'desc')
  )
  const history = useHistory()
  if (loading) return <Loader />
  return (
    <React.Fragment>
      <Header title="Leaderboard" />
      <ScrollablePaper>
        <Table size="small">
          <TableBody>
            {users.map((user, i) => (
              <TableRow
                key={user.uid}
                onClick={() => history.push(`/profile/${user.uid}`)}
                style={{ backgroundColor: getBackgroundColor(user.rank) }}
              >
                <TableCell style={{ paddingRight: 0 }}>
                  <Avatar src={user.photoUrl} />
                </TableCell>
                <TableCell colSpan={2}>
                  <strong>
                    {i + 1}. {user.displayName}
                  </strong>
                </TableCell>
                <TableCell>
                  <strong>{parseInt(user.rank)}</strong>
                  <br />
                  <Delta delta={user.delta} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollablePaper>
    </React.Fragment>
  )
}

export default Leaderboard
