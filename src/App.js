import React, { Component } from 'react';
import './App.css';

import Card from './components/Card'
const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      items : [],
      isLoaded : false,
      search : "",
      badge: 1
    }
  }

  componentDidMount() {
    this.loadPokemon(API_ENDPOINT);
  }

  loadPokemon(endpoint){
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded : true,
          items : json
        });
      });
  }

  renderRows(filteredPokemon){
    let finalArr = [], columns = [];
    filteredPokemon.forEach ((pokemon, i) => {
      columns.push(
        <div key ={pokemon.name} className="col-md-4">
          <Card pokemon={pokemon}></Card> 
        </div>
      );
      if((i+1) % 3 === 0) {
        finalArr.push(<div key={i + '-row'} className ="row">{columns}</div>);
        columns = [];
      }
    });
    if(columns.length !== 0){
      finalArr.push(<div key='last-row' className ="row">{columns}</div>);
      columns = [];
    }

    return finalArr;
  }

  onchange = e => {
    this.setState({ search : e.target.value });
  }

  loadNextBadge = e =>{
    this.setState({
      badge : this.state.badge + 1
    });
    this.loadPokemon(API_ENDPOINT + '?offset=' + 20 *this.state.badge + '&limit=20');

  }

  render(){
    let { isLoaded, items, search } = this.state;

    if(!isLoaded) {
      return (<div> Fetching pokemons </div>);
    }
    else {
      var filteredPokemon = items.results.filter( pokemon => {
        return pokemon.name.indexOf(search.toLowerCase()) !== -1
      });

      return (
        <div className="App">
        <div className="ribbon-container sticky">
            <div className="left-upper-corner"></div>
            <div className="right-upper-corner"></div>
        </div>

          <div className ="container" id="search-container">
            <div className="row no-gutters">
              <div className="col">
              </div>
              <div className="col-6">
                <div className="input-group mb-3">
                  <input type="text" className="form-control" onChange={this.onchange} placeholder="Filtra pokemons por nombre..." aria-label="Username" aria-describedby="basic-addon1">
                  </input>
                </div>
              </div>
              <div className="col">
              </div>
            </div>
          </div>

          <div className ="container" id="main-container">
          {this.renderRows(filteredPokemon)}
          </div>
          <div style={{margin:10+'px'}}>
          <button type="button" className="btn btn-primary btn-lg" onClick={this.loadNextBadge}>Load next 20 pokemon</button>
          </div>
        </div>
      );
    }
}
}

export default App;
