const initialState = {
    pokemons:[],
    totalPages: '',
    pokemonDetail: [],
    types:[],
    evolution:{},
    };
  
    function rootReducer(state=initialState, action){
      
      if(action.type === 'GET_ALL_POKEMONS'){
        return{
          ...state,
          pokemons: action.payload.pokemons,
          totalPages: action.payload.totalPages
        }
      }
      if(action.type === 'GET_POKEMON'){
        return{
          ...state,
          pokemonDetail: action.payload,
        }
      }
      if(action.type === 'GET_TYPES'){
        return{
          ...state,
          types: action.payload,
        }
      }
      if(action.type === 'GET_EVOLUTION'){
        return{
          ...state,
          evolution: action.payload,
        }
      }
    
      return state;
    }
   
export default rootReducer;