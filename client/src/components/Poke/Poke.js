import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './Poke.css'
import axios from "axios";
import { connect } from 'react-redux';
// import { addGameFavorite } from '../../actions/index.js'

export function Poke(props){
    let [img, setImg] = useState('');
   let [id, setId] = useState();


   useEffect(()=> {
    setImg('')
},[])

    axios.get(props.url)
    .then((response) => {
      setImg(response.data.sprites.other["official-artwork"].front_default)
      setId(response.data.id)
    })

	return(
		<div className="card">
                <Link to={`/home/details/${id}`} className="titleLink">
            <p className="title">
                {props.name.charAt(0).toUpperCase() + props.name.slice(1)}                
            </p>  
            </Link>
            <div className="imgContainer">
            <img src={img === ''? 'https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif' : img} className="imgPok"></img>
            </div>
		</div>
		)
}

// export default Game


// function mapDispatchToProps(dispatch){
// 	return {
//         addGameFavorite: game => dispatch(addGameFavorite(game)),

// 	}
// }

export default connect(null,null)(Poke)