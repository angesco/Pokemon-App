import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getAllPokemons } from '../../actions/index.js'
import { Poke } from '../Poke/Poke.js'
import Pagination from '../Pagination/pagination.js';
import axios from "axios";
import './pokemons.css'
import {Link} from 'react-router-dom';

export function Pokemons(props){

	const [numeroPagina, setNumeroPagina] = useState(1); 
	var [title, setTitle] = useState("")
  let [loading, setLoading] = useState(true)

   let pokes = props.pokemons.slice()

	useEffect(()=> {
		props.getAllPokemons(numeroPagina, title)
    setTimeout(() => setLoading(false), 1500)
	},[numeroPagina, title])

  useEffect(()=> {
		setNumeroPagina(1)
	},[title])


    function handleChange(event) {
        setTitle(event.target.value)
        setLoading(true)
      }
      function handleSubmit(event) {
        event.preventDefault();
    
      if(title.length === 0){
        alert("Insert a valid pokemon name")
      } else{
        props.getAllPokemons(numeroPagina, title)
        setNumeroPagina(1)
      }
    
      }

    let pokesData = pokes.length === 0? <div className="noContainer"><p className="noTxt">No Pokemons</p></div> : pokes.map((game) => {

        return (
        <div className="divGame" key={game.id}>
            <Poke
            name={game.name}
            url={game.url}
            // id={game.id}
            // genres={game.genres}
            />
       </div>)
        })

	return (
		// props.pokemons.length === 0? <div className="loadContainer"><img src='https://media1.giphy.com/media/l4FGKbWgkhHVGXzTW/source.gif' className="loading"></img></div> :
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
                  <Pagination totalPages={props.totalPages} page={numeroPagina} setPage={setNumeroPagina} setLoad={setLoading}></Pagination>
	        </div>
          }
		</div>
	)
}

function mapStateToProps(state){
	return {
		pokemons: state.pokemons,
        totalPages: state.totalPages
	}
}

function mapDispatchToProps(dispatch){
	return {
		getAllPokemons: (page, name) => dispatch(getAllPokemons(page, name)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Pokemons)