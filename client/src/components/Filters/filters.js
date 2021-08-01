import React, {useEffect, useState}  from 'react'
import { connect } from 'react-redux';
import './filters.css'

import { getTypes } from '../../actions/index.js'


export function Filter(props){

	const [input, setInput] = useState("")

	  function handleChange(e) {
		  setInput(e.target.value)
		 }

          function handleDispatchOrder(event) {
            if (event.target.value === 'A-Z' || event.target.value === 'Z-A' || event.target.value === '') {
                    props.setOrder(event.target.value)
                    props.setLoading(true)
                }
              }


  const handleFilter = (e) => {
    props.setFilter(e.target.value)
    props.setNumeroPagina(1)
	props.setLoading(true)
  };

  	return(
  	<div className="filtros">
       <div className="close"><p className="closeTxt" onClick={(e) => props.setPoke('close')}>X</p></div>

        <div className="orderContainer">

<div className="orderAlpha">
    <select className="selectAlpha" onChange={handleDispatchOrder}>
      <option value={''}>Order Alphabetically</option>
      <option value={'A-Z'}>Ascendant (A - Z)</option>
      <option value={'Z-A'}>Descendant (Z - A)</option>
   </select>
   </div>
</div>

	  
      <div className="filterCreator"> 
	  <select className="selectCreator" onChange={(e) => handleFilter(e)}>
	             <option default value=''>Filter by type</option>
				{props.types && props.types.map((t) => (
				  <option key={t.id} value={t.name}>{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</option>
				))}
        </select>
      </div>
      
  	</div>
  	)
}

export default connect(null, null)(Filter)