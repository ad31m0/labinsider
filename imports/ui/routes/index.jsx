import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom'
import Container from '@material-ui/core/Container'

import { Header } from '/imports/ui/layout/Header'

import { DataTable } from '/imports/ui/components/DataTable'

 function AllLabsPage() {
  return (
        <DataTable query={{}} />
  )
}
function FavouriteLabsPage() {
  return (
        <DataTable query={{favourite: true}} />
  )
}

export const RenderRoutes = () => (
  <Router>
    <Header />

    <Container style={{ marginTop: '1rem' }}>
      <Switch>
        <Route exact path="/">
          <AllLabsPage/>
        </Route>
        <Route exact path="/favourites">
          <FavouriteLabsPage/>
        </Route>
    
      </Switch>
    </Container>
  </Router>
)
