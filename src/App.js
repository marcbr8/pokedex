import React, { Component } from 'react';
import './App.css';


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
          {items.results[0].name}
          </div>
        </div>
      );
    }
}
}

export default App;
