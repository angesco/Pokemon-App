const initialState = {
    pokemons:[],
    totalPages: '',
    filteredPokemons: []
    };
  
    function rootReducer(state=initialState, action){
      
      if(action.type === 'GET_ALL_POKEMONS'){
        return{
          ...state,
          pokemons: action.payload.pokemons,
          totalPages: action.payload.totalPages
        }
      }
    
      return state;
    }
   
export default rootReducer;