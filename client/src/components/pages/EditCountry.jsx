import React, { Component } from 'react'
import api from '../../api';

export default class EditCountry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      capital: [],
      area: '',
      description: ''
    }
  }
  handleInputChange (stateKey, event){
    this.setState ({
      [stateKey]: event.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault()
    api.editCountry(this.match.params.countryId, {
      name: this.state.name,
      capitals: this.state.capitals,
      area: this.state.area,
      description: this.state.description
    })
    .catch(err => console.log('yeeah'))
  }
  render() {
    return (
      <div className="EditCountry">
        <h1>Edit</h1>
        <form>
          Name: <input type="text" value={this.state.name} onChange={(e) => { this.handleInputChange("name", e) }} /> <br />
          Capitals: <input type="text" value={this.state.capitals} onChange={(e) => { this.handleInputChange("capitals", e) }} /> <br />
          Area: <input type="number" value={this.state.area} onChange={(e) => { this.handleInputChange("area", e) }} /> <br />
          Description: <textarea value={this.state.description} cols="30" rows="10" onChange={(e) => { this.handleInputChange("description", e) }} ></textarea> <br />
          <button onClick={(e) => this.handleClick(e)}>Create country</button>
        </form>
      </div>
    )
  }
  componentDidMount() {
    api.getCountryDetail(this.props.match.params.id)
    .then(country => {
      this.setState({
        name: country.name,
        capitals: country.capitals,
        area: country.area,
        description: country.description
      })
    })
  }
}
