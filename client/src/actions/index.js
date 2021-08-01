export function getAllPokemons(page, name, order, filter){
	return function(dispatch){
		return fetch(`http://localhost:3001/pokemons?page=${page}&filter=${filter}&order=${order}&name=${name}`)
		.then(response => response.json())
		.then(json => {
			dispatch({ type: 'GET_ALL_POKEMONS', payload: json})
		})
	}
}

export function getPokemon(id){
	return function(dispatch){
		return fetch(`http://localhost:3001/pokemon/${id}`)
		.then(response => response.json())
		.then(json => {
			dispatch({ type: 'GET_POKEMON', payload: json})
		})
	}
}

export function getTypes(){
	return function(dispatch){
		return fetch(`http://localhost:3001/types`)
		.then(response => response.json())
		.then(json => {
			console.log(json)
			dispatch({ type: 'GET_TYPES', payload: json})
		})
	}
}

// export function getEvolution(id){
// 	return function(dispatch){
// 		return fetch(`http://localhost:3001/pokemon/${id}/evolution`)
// 		.then(response => response.json())
// 		.then(json => {
// 			dispatch({ type: 'GET_EVOLUTION', payload: json})
// 		})
// 	}
// }

export function getEvolution(pokemon) {
	return function (dispatch) {
	  fetch(pokemon)
		.then(r => r.json())
		.then((result) =>
		  fetch(result.evolution_chain.url)
			.then(res => res.json())
			.then((evodata) => dispatch({
			  type: 'GET_EVOLUTION',
			  payload: evodata
			})
			));
	};
  }
