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


  render(){
    let { isLoaded, items } = this.state;

    if(!isLoaded) {
      return (<div> Fetching pokemons </div>);
    }
    else {
      console.log(items.results[0]);
      return (
        <div className="App">
          <div className ="container" id="mainContainer">
            <div key='row' className ="row mt-4">
              <div key ={items.results[0].name} className="col-md-4">
                <Card pokemon={items.results[0]}></Card> 
              </div>
              <div key ={items.results[1].name} className="col-md-4">
                <Card pokemon={items.results[1]}></Card> 
              </div>
              <div key ={items.results[2].name} className="col-md-4">
                <Card pokemon={items.results[2]}></Card> 
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
