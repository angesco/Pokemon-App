import React from 'react';
import {Link} from 'react-router-dom'
import './landingpage.css'

export function Landingpage(){
	return(
		<div className="cnt_land">
		<div className="lndpage">
		
		<Link to='/home'>
			<button className="btnp">Homepage</button>
		</Link>
		</div>
		</div>
		)
}

export default Landingpage