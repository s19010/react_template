import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions
  // List,
  // ListItem,
  // ListItemText,
  // TextField
} from '@material-ui/core'
// import Autocomplete from '@material-ui/lab/Autocomplete'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      item: {}
    }
    this.apiToken = 'XXXXX'
  }

  async getData () {
    const getJSON = (uri, options) =>
      window.fetch(uri, options).then(res => res.json())

    const options = { method: 'get' }
    const uri = 'XXXXX'
    const params = `XXXXX`
    const data = await getJSON(uri + params, options)
    this.setState({ data: data })
  }

  handleUpdate (event) {
    const index = event.target.dataset.optionIndex
    const item = this.state.data[index]
    this.setState({ item: item })
  }

  async componentDidMount () {
    this.getData()
  }

  render () {
    return (
      <Card>
        <CardHeader title='XXXXX' />
        <CardActions>
          {/* <SelectorView
            data={this.state.data}
            handleUpdate={this.handleUpdate.bind(this)}
          /> */}
        </CardActions>
        <CardContent>
          {/* <ListView item={this.state.item} /> */}
        </CardContent>
      </Card>
    )
  }
}

// const SelectorView = props => (
//   <Autocomplete
//     options={props.data}
//     getOptionLabel={option => option.XXXXX}
//     renderInput={params => (
//       <TextField
//         {...params}
//         label='XXXXX'
//         variant='outlined'
//         style={{ width: 400 }}
//         fullWidth
//       />
//     )}
//     onChange={props.handleUpdate}
//   />
// )

// const ListView = props => {
//   const text = props.item.XXX

//   return (
//     <List>
//       <ListItem>
//         <ListItemText primary={text} secondary= />
//       </ListItem>
//     </List>
//   )
// }

export default App
