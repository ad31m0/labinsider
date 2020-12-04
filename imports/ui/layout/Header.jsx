import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: "white",
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
 logo: {
    marginTop: "0.5em",
    margin: 'auto',
    textAlign: 'center',
    maxWidth: '50%',
    maxHeight: '50%',
  },
  logoHorizontallyCenter: {
       flexGrow: 1,
 
  },

}))

export function Header() {
  const classes = useStyles()
  const location = useLocation();

  return (
    <AppBar  position="static" style={{ background: '#ddd' }}>
      <Toolbar>

        <Typography variant="h6" className={classes.logoHorizontallyCenter}>

          <img src={'/logo.png'} className={classes.logo} alt="logo" />
        </Typography>

        <Button  className={classes.menuButton} color="primary" variant="contained" disabled={location.pathname == "/"} component={Link} to="/">
          All Facilities
        </Button>
          <Button  className={classes.menuButton}  color="primary" variant="contained" disabled={location.pathname == "/favourites"} component={Link} to="/favourites">
         Favourites
        </Button>
      </Toolbar>
    </AppBar>
  )
}
