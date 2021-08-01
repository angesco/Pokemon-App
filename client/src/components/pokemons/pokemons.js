import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getAllPokemons, getTypes, getEvolution } from '../../actions/index.js'
import { Poke } from '../Poke/Poke.js'
import { Filter } from '../Filters/filters.js'
import Pagination from '../Pagination/pagination.js';
import './pokemons.css'

export function Pokemons(props){
	const [numeroPagina, setNumeroPagina] = useState(1); 
	let [title, setTitle] = useState("")
  let [loading, setLoading] = useState(true)
  let [pokedex, setPokedex] = useState('close')
  let [order, setOrder] = useState('')
  let [filter, setFilter] = useState('')

   let pokes = props.pokemons.slice()

	useEffect(()=> {
		props.getAllPokemons(numeroPagina, title, order,filter)
    console.log(filter)
    setTimeout(() => setLoading(false), 1500)
	},[numeroPagina, title, order, filter])


  useEffect(()=> {
		setNumeroPagina(1)
	},[title])

  useEffect(()=> {
		props.getTypes()
	},[])

    function handleChange(event) {
        setTitle(event.target.value)
        setLoading(true)
      }
      function handleSubmit(event) {
        event.preventDefault();
    
      if(title.length === 0){
        alert("Insert a valid pokemon name")
      } else{
        props.getAllPokemons(numeroPagina, title, order, filter)
        setNumeroPagina(1)
      }
    
      }

    let pokesData = pokes.length === 0? <div className="noContainer"><p className="noTxt">No Pokemons</p></div> : pokes.map((p) => {

        return (
        <div className="divGame" key={p.pokemon? p.pokemon.id : p.id}>
            <Poke
            name={p.pokemon? p.pokemon.name : p.name}
            url={p.pokemon? p.pokemon.url : p.url}
            />
       </div>)
        })

	return (
		// props.pokemons.length === 0? <div className="loadContainer"><img src='https://media1.giphy.com/media/l4FGKbWgkhHVGXzTW/source.gif' className="loading"></img></div> :
    <div className="all">
      { pokedex === 'close'? <div className='btnContainer'><div className="btnPoke" onClick={(e) => setPokedex('open')} title='Open Pokedex'></div></div> :
    <div className="filterContainer">
        <Filter setLoading={setLoading} setPoke={setPokedex} setOrder={setOrder} types={props.types} setFilter={setFilter} setNumeroPagina={setNumeroPagina}></Filter>
    </div>}
    
  <div className="allHome">

<div className="searchContainer">
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div>

            <input
            className="inputSearch"
            placeholder="Search Pokemon"
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className="btnSearch material-icons" type="submit">search</button>
        </form>
		</div>
          {pokes.length === 0? null :
            <div className="paginationBtns">
                  <Pagination totalPages={props.totalPages} page={numeroPagina} setPage={setNumeroPagina} setLoad={setLoading}></Pagination>
	        </div>
          }
{/*--------------------Pokes-----------------------*/}

{ loading === true? <div className="loadContainer"><img src='https://media1.giphy.com/media/l4FGKbWgkhHVGXzTW/source.gif' className="loading"></img></div> :
  <div className="contenedor">
				<div className="pokeDiv">
					<div className="poke">{pokesData}</div>
                </div>

			</div>
      }
            {pokes.length === 0? null :
            <div className="paginationBtns">
                  <Pagination totalPages={props.totalPages} page={numeroPagina} setPage={setNumeroPagina} setLoad={setLoading} types={props.types}></Pagination>
	        </div>
          }
		</div>
    </div> 
	)
}

function mapStateToProps(state){
	return {
		pokemons: state.pokemons,
    totalPages: state.totalPages,
    types: state.types,
    evolution:state.evolution,
	}
}

function mapDispatchToProps(dispatch){
	return {
		getAllPokemons: (page, name, order,filter) => dispatch(getAllPokemons(page, name, order, filter)),
    getTypes:() => dispatch(getTypes()),
    getEvolution:(id) => dispatch(getEvolution(id)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Pokemons)