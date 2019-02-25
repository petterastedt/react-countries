import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom'

class Countries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }
  deleteCountry(countryId) {
    api.deleteCountry(countryId).then(data => {
      this.setState({
        // I filter the array of countries
        // I filter all the id that are different from countries from the state Array
        countries: this.state.countries.filter(c => c._id !== countryId),
        message: 'The country has been deleted'
      });
      setTimeout(()=> {
        this.setState({
          message: null,
        })
      }, 3000)
    });
    console.log("Delete", countryId);
  }

  render() {
    return (
      <div className="Countries">
        <h2>List of countries</h2>
        {/* 'c' represents the current country */}
        {this.state.countries.map(c => <li key={c._id}>
        {c.name} 
        <Link to={`/countries/${c._id}`}> Details </Link>{''}
        <button onClick={()=>this.deleteCountry(c._id)}>Delete</button>
        </li>)}
      </div>
    );
  }
  componentDidMount() {
    api.getCountries()
      .then(countries => {
        console.log(countries)
        this.setState({
          countries: countries
        })
      })
      .catch(err => console.log(err))
  }
}

export default Countries;
