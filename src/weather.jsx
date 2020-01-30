import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  TextField,
  Avatar,
  ListItemIcon
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { ShowChart, WbSunny } from '@material-ui/icons'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      item: {
        weather: '',
        temperature: '',
        icon: ''
      },
      placeName: ''
    }
    this.apiToken = '6f8fd58a3ea6d25ae6f70c3d003d1e66'
  }

  async getData (id) {
    const getJSON = (uri, options) =>
      window
        .fetch(uri, options)
        .then(res => res.json())
        .then(json => ({
          weather: json.weather[0].description,
          icon: json.weather[0].icon,
          temperature: json.main.temp
        }))

    const options = { method: 'get' }
    const uri =
      'http://api.openweathermap.org/data/2.5/weather?lang=ja&units=metric'
    const params = `&appid=${this.apiToken}&id=${id}`
    const data = await getJSON(uri + params, options)
    this.setState({ item: data })
  }

  handleUpdate (event) {
    const index = event.target.dataset.optionIndex
    const place = this.state.data[index]
    this.getData(place.id)
    this.setState({ placeName: place.name })
  }

 componentDidMount () {
    this.setState({ data: [
      { name: '札幌', id: 2128295 },
      { name: '東京', id: 1850147 },
      { name: '大阪', id: 1853909 },
      { name: '沖縄', id: 1894616 }
    ] })
  }

  render () {
    return (
      <Card>
        <CardHeader title='天気情報' />
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
    getOptionLabel={option => option.name}
    renderInput={params => (
      <TextField
        {...params}
        label='Choose a location'
        variant='outlined'
        style={{ width: 300 }}
        fullWidth
      />
    )}
    onChange={props.handleUpdate}
  />
)

const ListView = props => {
  const { weather, icon, temperature } = props.item
  const formatTemperature = temperature ? `${temperature}℃` : ''
  const path = `http://openweathermap.org/img/wn/${icon}.png`
  const image = icon ? <Avatar src={path} alt={weather} /> : <WbSunny />
  return (
    <List>
      <ListItem>
        <ListItemIcon>{image}</ListItemIcon>
        <ListItemText primary={weather} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ShowChart />
        </ListItemIcon>
        <ListItemText primary={formatTemperature} />
      </ListItem>
    </List>
  )
}

export default App
