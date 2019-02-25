import React, { Component } from 'react'
import api from '../../api';

export default class CountryDetail extends Component {
  constructor (props){
    super(props)
    this.state = {
      country: null
    }
  }
  render() {
    if (!this.state.country) {
      return <div className="CountryDetail">Loading..</div>
    }
    return (
      <div class="CountryDetail">
      <strong>Name: {this.state.country.name}</strong><br />
      <strong>Capitals: {this.state.country.capitals}</strong><br />
      <strong>Area: {this.state.country.area}</strong><br />
      <strong>Description: {this.state.country.description}</strong><br />  
      </div>
    )
  }
  componentDidMount() {
    api.getCountryDetail(this.props.match.params.countryId)
      .then(country => {
        this.setState({
          country: country
        })
      })
      .catch(err => console.log(err))
  }
}
