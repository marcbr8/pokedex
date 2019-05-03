import React, { Component } from 'react';

import Evolution from './Evolution'

class Card extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoaded : false
    }
  }

  componentDidMount(){
    fetch(this.props.pokemon.url)
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded : true,
        pokemon : json
      })
    });
  }

  addTypes(pokemon){
    const types = pokemon.types;
    return types.map((type, i) =>
     <span key={pokemon.name + '-type-' + i} className="badge badge-light text-uppercase"> {type.type.name}</span>
    );
  }

  render(){
    var {isLoaded, pokemon } = this.state
    if(!isLoaded){
      return (
        <p>isLoading</p>
      )
    }
    else{
      return(
        <div className="card shadow-lg" style={{width:250 +'px'}} >
          <div className="text-center dark-grey-background">
            <img  className="card-img-top mb-3 w-auto" alt="" src={pokemon.sprites.front_default}>
            </img>
          </div>
          <div className="card-img-overlay">
            <span className="pokemon-id"> ID/{pokemon.id} </span>
          </div>
          <div className="card-body">
            <h5 className="card-title text-capitalize">{ pokemon.name } </h5>
            {this.addTypes(pokemon)}
            <Evolution pokemon={pokemon}></Evolution>
          </div>
        </div>
      ) 
    }

  }
}


export default Card;