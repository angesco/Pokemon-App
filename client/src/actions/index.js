export function getAllPokemons(page, name){
	return function(dispatch){
		return fetch(`http://localhost:3001/pokemons?page=${page}&filter=&order=&name=${name}`)
		.then(response => response.json())
		.then(json => {
			dispatch({ type: 'GET_ALL_POKEMONS', payload: json})
		})
	}
}