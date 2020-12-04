import React from 'react'
import { CircularProgress, Typography } from '@material-ui/core'
import MUIDataTable from 'mui-datatables'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'

import ButtonGroup from '@material-ui/core/ButtonGroup'

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import FiltersCard from './FiltersCard'

import Grid from '@material-ui/core/Grid'

function FavouriteStatusSwitch({ lab }) {
  if (!lab._id) return <span>Loading</span>
  const [favourite, setFavourite] = React.useState(lab.favourite ? true : false) // && client.active === true ? true : false ;
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={favourite}
            onChange={(e) => {
              const newFavourite = e.target.checked
              setFavourite(newFavourite)
              Meteor.call('lab.setFavouriteStatus', {
                _id: lab._id,
                favourite: newFavourite,
              })
              //this.handleToggleActivate.bind(this)
            }}
            name={`labFavourite${lab._id}`}
            color="primary"
          />
        }
      />
    </FormGroup>
  )
}

class DataTable extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    page: 0,
    count: 1,
    rowsPerPage: 5,
    sortOrder: {},
    query: props.query,
    data: [['Loading Data...']],
    columns: [
      {
        name: 'favourite',
        label: 'Favourite',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const lab = this.state.data[tableMeta.rowIndex]
            return <FavouriteStatusSwitch lab={lab} />
          },
        },
      },
      {
        name: 'name',
        label: 'Name',
        options: {},
      },
      {
        name: 'director',
        label: 'Director',
        options: {},
      },
      {
        name: 'city',
        label: 'City',
        options: {},
      },
      {
        name: 'country',
        label: 'Country',
        options: {},
      },
      // {
      //   name: '_id',
      //   label: 'Actions',
      //   options: {
      //     customBodyRender: (value, tableMeta, updateValue) => {
      //       return (
      //         <ButtonGroup>
      //           <Button component={Link} to={`/clients/edit/${value}`}>
      //             <EditIcon />
      //           </Button>
      //           <Button component={Link} to={`/clients/view/${value}`}>
      //             <VisibilityIcon />
      //           </Button>
      //         </ButtonGroup>
      //       )
      //     },
      //   },
      //},
    ],
    isLoading: false,
  }

  }
  componentDidMount() {
    this.getData('labs.paginate', 0)
  }

  onFilterChange = (field, value) => {
    const that = this
    let query = this.state.query || {}

    if (value) {
      query[field] = value
    } else {
      //TODO need a better way of doing this! probably based on schema :S
      delete query[field]
    }

    console.log('field', field, value, query)

    this.setState({
      isLoading: true,
    })
    this.xhrRequest(`labs.paginate`, 0, this.state.sortOrder, query).then(
      (res) => {
        this.setState({
          ...that.state,
          query,
          isLoading: false,
          page: 0,
          data: res.data,
          count: res.total,
        })
      }
    )
  }

  // get data
  getData = async (url, page) => {
    this.setState({ isLoading: true })
    const res = await this.xhrRequest(url, page)
    this.setState({
      ...this.state,
      data: res.data,
      isLoading: false,
      count: res.total,
    })
  }

  getSrcData = () => {
    return []
  }

  sort = (page, sortOrder) => {
    const that = this
    this.setState({ isLoading: true })
    this.xhrRequest(`labs.paginate`, page, sortOrder).then((res) => {
      this.setState({
        ...that.state,
        sortOrder,
        isLoading: false,
        data: res.data,
        page: res.page,
        count: res.total,
      })
    })
  }

  // mock async function
  xhrRequest = (url, page, sortOrder = {}) => {
    return new Promise((resolve, reject) => {
      // mock page data
      Meteor.call(
        url,
        {
          page,
          sortOrder,
          rowsPerPage: this.state.rowsPerPage,
          query: this.state.query,
        },
        (error, result) => {
          const { data, total, page } = result
          resolve({
            data,
            total,
            page,
          })
        }
      )
    })
  }

  changePage = (page, sortOrder) => {
    const that = this
    this.setState({

      isLoading: true,
    })
    this.xhrRequest(`labs.paginate`, page, sortOrder).then((res) => {
      this.setState({
        ...that.state,
        sortOrder,
        isLoading: false,
        page: res.page,
        data: res.data,
        count: res.total,
      })
    })
  }

  render() {
    const { data, page, count, isLoading, rowsPerPage, sortOrder } = this.state

    const options = {
      filter: false,
      search: false,
      responsive: 'vertical',
      serverSide: true,
      count: count,
      rowsPerPage: rowsPerPage,
      rowsPerPageOptions: [5,20,100],
      sortOrder: sortOrder,
      onRowsDelete: (rowsDeleted) => {
                      const that = this

        const idsToDelete = rowsDeleted.data.map((d) => data[d.dataIndex]._id) // array of all ids to to be deleted

        Meteor.call('labs.remove', {ids: idsToDelete}, ()=>{
    this.setState({
      data: [["Loading..."]],
      isLoading: true,
    })
    this.xhrRequest(`labs.paginate`, 0, this.state.sortOrder).then((res) => {
      this.setState({
        ...that.state,
        isLoading: false,
        page: res.page,
        data: res.data,
        count: res.total,
      })
    })
        })

        //http.delete(idsToDelete, res).then(window.alert('Deleted!')); // your delete request here
      },
      onTableChange: (action, tableState) => {
        console.log('actionzzz', action, tableState)

        // a developer could react to change on an action basis or
        // examine the state as a whole and do whatever they want

        switch (action) {
          case 'changePage':
            this.changePage(tableState.page, tableState.sortOrder)
            break
          case 'sort':
            this.sort(tableState.page, tableState.sortOrder)
            break
          default:
            console.log('action not handled.')
        }
      },
    }

    //console.log('COLUMNS')
    //console.dir(JSON.parse(JSON.stringify(this.state.columns)))

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FiltersCard onFilterChange={this.onFilterChange.bind(this)} />
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title={
              <Typography variant="h6">
                {isLoading && (
                  <CircularProgress
                    size={24}
                    style={{
                      marginLeft: 15,
                      position: 'relative',
                      top: 4,
                    }}
                  />
                )}
              </Typography>
            }
            data={data}
            columns={this.state.columns}
            options={options}
          />
        </Grid>
      </Grid>
    )
  }
}

export { DataTable }