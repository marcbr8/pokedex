import React, { Component } from 'react';
import './App.css';
import Card from './components/Card'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items : [],
      isLoaded : false
    }
  }

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded : true,
          items : json
        });
      });
  }


  renderRows(pokemons){
    let finalArr = [], columns = [];
    pokemons.forEach ((pokemon, i) => {
      columns.push(
        <div key ={pokemon.name} className="col-md-4">
          <Card pokemon={pokemon}></Card> 
        </div>
      );
      if((i+1) % 3 === 0) {
        finalArr.push(<div key={i + '-row'} className ="row mt-4">{columns}</div>);
        columns = [];
      }
    });
    if(columns.length !== 0){
      finalArr.push(<div key='last-row' className ="row mt-4">{columns}</div>);
      columns = [];
    }

    return finalArr;
  }

  render(){
    let { isLoaded, items } = this.state;

    if(!isLoaded) {
      return (<div> Fetching pokemons </div>);
    }
    else {
      return (
        <div className="App">
          
          <div className ="container" id="mainContainer">
          {this.renderRows(items.results)}
          </div>
        </div>
      );
    }
  }
}

export default App;
