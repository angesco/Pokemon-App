import React, { useState, useEffect } from 'react';
import './evolution.css'
import { connect } from 'react-redux';

export function Evolution({ getEvolution, evolutions, pokemon, showEv }) {
  const [imgActive, setImgActive] = useState(false);
  const [evolution1, setEvolution1] = useState('');
  const [evolution2, setEvolution2] = useState([]);
  const [evolution3, setEvolution3] = useState('');
  const [evolutionImages, setImages] = useState([]);

  useEffect(() => {
	getEvolution(pokemon.species.url)
  }, [showEv])

  useEffect(() => {
    if (Object.keys(evolutions).length > 0) {
      setEvolution1(evolutions.chain.species.name)
      if (evolutions.chain.evolves_to.length > 0) {
        if (evolutions.chain.evolves_to[0].evolves_to.length > 0) {
          setEvolution3(evolutions.chain.evolves_to[0].evolves_to[0].species.name)
        }
        setEvolution2(evolutions.chain.evolves_to)
      }
    }
    return () => { setEvolution1(''); setEvolution2([]); setEvolution3('') }
  }, [evolutions])
  useEffect(() => {
    
    function getData(pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(r => r.json())
        .then(data => {
          if (data !== undefined) {
            const pokemon = {
              name: data.name,
              id: data.id,
              img: data.sprites.other['official-artwork'].front_default
            }

            setImages(images => [...images, pokemon])
          }
        }
        ).catch(err => { console.error(err) });
    }
    if (evolution1 !== '') {
      getData(evolution1); evolution2.map(m => getData(m.species.name)); getData(evolution3);
      setImgActive(true)
    }
    return setImages([])
  }, [evolution1, evolution2, evolution3])

  return (
    <div className='evContainer'>
      {/* <h3 className='evolutionsTitle'>Forms</h3> */}
      {imgActive ?
        <div className='evolutions'>
          {evolutionImages.map((i, index) =>
            <div className="cardEvo" key={i.name + i.id}>
              <h5 className='evolutionsName'>{index === 0? i.name + '(base)' : i.name + '(Form' + `${index + 1})` }</h5>
              <img className='evolutionsIcon' src={i.img} alt={`${i.name} Evolution`} />
            </div>)}
        </div> :
        <div>Loading</div>}

    </div>
  )
}

export default connect(null,null)(Evolution)