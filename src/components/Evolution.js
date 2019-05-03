import React, { Component } from 'react';
import './Evolution.css';

class Evolution extends Component {

	constructor(props){
		super(props);
		this.state = {
			isLoaded : false
		}
	}

	componentDidMount(){
    	fetch('https://pokeapi.co/api/v2/pokemon-species/' + this.props.pokemon.id)
    	.then(res => res.json())
    	.then(json => {
      	this.setState({
        	isLoaded : true,
        	species : json
      	})
   	});
  }

	render(){
		if(!this.state.isLoaded){
			return <span>Fetching evolution</span>
		}
		if(this.state.species.evolves_from_species!=null){
			return <div className="bs-callout bs-callout-danger">
			<p>Evoluciona de</p>
			<h4>{this.state.species.evolves_from_species.name}</h4>
			</div>
		}
		return <span></span>

	}
}

export default Evolution;