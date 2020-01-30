import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

const getCurrentPosition = async () => {
  const geolocation = options =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    )
  const options = { enableHighAccuracy: true }
  const position = await geolocation(options)
    .then(json => json.coords)
    .then(coords => ({
      latitude: coords.latitude,
      longitude: coords.longitude
    }))
    .catch(error => console.log(error))

  return position
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      item: {
        LocationName: '',
        Perfecture: '',
        City: '',
        AddressArea: ''
      }
    }
  }

  async getData (lat, lng) {
    const getJSON = (uri, options) =>
      window.fetch(uri, options).then(res => res.json())

    const options = { method: 'get' }
    const uri = 'https://aed.azure-mobile.net/api/'
    const params = `AEDSearch?lat=${lat}&lng=${lng}`
    const data = await getJSON(uri + params, options)
    this.setState({ data: data })
  }

  handleUpdate (event) {
    const index = event.target.dataset.optionIndex
    const item = this.state.data[index]
    this.setState({ item: item })
  }

  async componentDidMount () {
    const { latitude, longitude } = await getCurrentPosition()
    this.getData(latitude, longitude)
  }

  render () {
    return (
      <Card>
        <CardHeader title='AED Information' />
        <CardActions>
          <SelectorView
            data={this.state.data}
            handleUpdate={this.handleUpdate.bind(this)}
          />
        </CardActions>
        <CardContent>
          <ListView item={this.state.item} />
        </CardContent>
      </Card>
    )
  }
}

const SelectorView = props => (
  <Autocomplete
    options={props.data}
    getOptionLabel={option => option.LocationName}
    renderInput={params => (
      <TextField
        {...params}
        label='Choose a location'
        variant='outlined'
        style={{ width: 400 }}
        fullWidth
      />
    )}
    onChange={props.handleUpdate}
  />
)

const ListView = props => {
  const item = props.item
  const location = item.LocationName
  const address = `${item.Perfecture}${item.City}${item.AddressArea}`

  return (
    <List>
      <ListItem>
        <ListItemText primary={location} secondary={address} />
      </ListItem>
    </List>
  )
}

export default App