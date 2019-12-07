import React from 'react'
import styled from 'styled-components'
import { Paper, Avatar, Grid, Typography, makeStyles } from '@material-ui/core'

const ProfilePic = styled(Avatar)`
  width: 80px !important;
  height: 80px !important;
`

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  paper: {
    height: 'calc(16vh)',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.primary
  }
}))

const Card = styled(({ children, ...rest }) => (
  <Paper square elevation={1} {...rest}>
    {children}
  </Paper>
))`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  flex-direction: column;
  background-color: #bada55;
`

const Label = styled(({ children, ...rest }) => (
  <Typography variant="body1" color="textSecondary" {...rest}>
    {children}
  </Typography>
))`
  font-weight: bold;
`

const UserInfo = ({ info }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.paper}>
            <ProfilePic src={info.photoUrl} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.paper}>
            <Typography variant="h1">{parseInt(info.rank)}</Typography>
            <Label>Rank</Label>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.paper}>
            <Typography variant="h3">{info.gamesPlayed}</Typography>
            <Label>Total</Label>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.paper}>
            <Typography variant="h3">{info.gamesWon}</Typography>
            <Label>Win</Label>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.paper}>
            <Typography variant="h3">{info.gamesLost}</Typography>
            <Label>Loss</Label>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.paper}>
            <Typography variant="h3">
              {(info.gamesWon / info.gamesLost).toFixed(2)}
            </Typography>
            <Label>W/L</Label>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.paper}>
            <Typography variant="h3">{parseInt(info.delta)}</Typography>
            <Label> Delta</Label>
          </Card>
        </Grid>
      </Grid>
    </div>
    // <GridList cols={6} style={{ width: '100%' }}>
    //   <GridListTile cols={2}>
    //     <Card>
    //       <ProfilePic src={info.photoUrl} />
    //     </Card>
    //   </GridListTile>
    //   <GridListTile cols={4}>
    //     <Card>
    //       <Typography variant="h1">{parseInt(info.rank)}</Typography>
    //       <br />
    //       <Label>Rank</Label>
    //     </Card>
    //   </GridListTile>
    //   <GridListTile cols={2}>
    //     <Card>
    //       <Typography variant="h3">{info.gamesPlayed}</Typography>
    //       <br />
    //       <Label>Total</Label>
    //     </Card>
    //   </GridListTile>
    //   <GridListTile cols={2}>
    //     <Card>
    //       <Typography variant="h3">{info.gamesWon}</Typography>
    //       <br />
    //       <Label>Win</Label>
    //     </Card>
    //   </GridListTile>
    //   <GridListTile cols={2}>
    //     <Card>
    //       <Typography variant="h3">{info.gamesLost}</Typography>
    //       <br />
    //       <Label>Loss</Label>
    //     </Card>
    //   </GridListTile>
    //   <GridListTile cols={3}>
    //     <Card>
    //       <Typography variant="h3">
    //         {(info.gamesWon / info.gamesLost).toFixed(2)}
    //       </Typography>
    //       <br />
    //       <Label>W/L</Label>
    //     </Card>
    //   </GridListTile>
    //   <GridListTile cols={3}>
    //     <Card>
    //       <Typography variant="h3">{parseInt(info.delta)}</Typography>
    //       <br />
    //       <Label> Delta</Label>
    //     </Card>
    //   </GridListTile>
    // </GridList>
  )
}

export default UserInfo
