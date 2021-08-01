import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { getPokemon, getEvolution} from '../../actions/index';
import { Evolution } from '../Evolution/evolution'

import './detail.css'

 function Detail(props){
   let [load, setLoad] = useState(true)
   let [showEv, setShowEv] = useState(false)
   let [specie, setSpecie] = useState('')

	 useEffect(() => {
    const id = props.match.params.id;
     props.getPokemon(id)
	 setTimeout(() => setLoad(false), 1500)
  }, [])

  useEffect(() => {
	setTimeout(props.getEvolution(props.pokemonDetail), 1500)
  }, [showEv])



    function handleClick(e) {
		setShowEv(true)
	}


if(props.pokemonDetail.types){

 var types = [];

 for(let i = 0; i < props.pokemonDetail.types.length; i++) {
    types.push(props.pokemonDetail.types[i].type.name)
   } 


 } 


	return(
        load === true ? <div className="loadContainer"><img src='https://media1.giphy.com/media/l4FGKbWgkhHVGXzTW/source.gif' className="loading"></img></div> :
		<div className="contdetail">
		<div className="cardetail">
		<div className="arriba">
			<img src={props.pokemonDetail.sprites.other['official-artwork'].front_default} alt={props.pokemonDetail.name} className="imgDetail"/>
			{showEv === true? 
			<Evolution getEvolution={props.getEvolution} evolutions={props.evolution} pokemon={props.pokemonDetail} showEv={showEv}></Evolution>
		    :
				<div className="detail">
			<h2 className="titleGame">{props.pokemonDetail.name.charAt(0).toUpperCase() + props.pokemonDetail.name.slice(1)}</h2>
			<h3 className="descriptionGame">{props.pokemonDetail.description}</h3>
			
			<div className="pContainer">
				<p>HP: {props.pokemonDetail.stats[0].base_stat || 'no data'}</p>
				<p>Defense: {props.pokemonDetail.stats[2].base_stat || 'no data'}</p>
				<p>Speed: {props.pokemonDetail.stats[5].base_stat || 'no data'}</p>
				<p>Attack: {props.pokemonDetail.stats[1].base_stat || 'no data'}</p>
				<p>Types: {types.join(", ") || 'no data'}  </p>
			</div>
			
          <button className='btnEv' onClick={() => handleClick()}></button> 

			</div>}
		</div>


		</div>
		</div>
		)

}

function mapStateToProps(state){
	return {
		pokemonDetail: state.pokemonDetail,
		evolution: state.evolution
	}
}

function mapDispatchToProps(dispatch){
	return{
		getPokemon:(id) => dispatch(getPokemon(id)),
		getEvolution:(pokemon) => dispatch(getEvolution(pokemon))

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)