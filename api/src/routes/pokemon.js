const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios')

router.get('/:id', (req, res, next) => {
    const pokemon = axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
        .then(response => res.json(response.data))
        // {
        //     specie: response.data.species.url,
        //     id: response.data.id,
        //     name: response.data.name,
        //     background_image: response.data.sprites.other['official-artwork'].front_default,
        //     weight: response.data.weight,
        //     hp: response.data.stats[0].base_stat,
        //     attack: response.data.stats[1].base_stat,
        //     defense: response.data.stats[2].base_stat,
        //     speed: response.data.stats[5].base_stat,
        //     types: response.data.types,
            
        // }
        .catch(err => next(err))
    })

    router.get('/:id/evolution', async (req, res, next) => {

        axios.get(`https://pokeapi.co/api/v2/evolution-chain/${req.params.id}`)
         .then((response) => {
             let evolutions= []
            if(response.data.chain.evolves_to.length > 0){
                if(response.data.chain.evolves_to[0].evolves_to.length > 0){
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${response.data.chain.evolves_to[0].evolves_to[0].species.name}`)
                .then((resp) => {
                   evolutions.push({
                    id: resp.data.id,
                    name: resp.data.name,
                    background_image: resp.data.sprites.other['official-artwork'].front_default,
                    weight: resp.data.weight,
                    hp: resp.data.stats[0].base_stat,
                    attack: resp.data.stats[1].base_stat,
                    defense: resp.data.stats[2].base_stat,
                    speed: resp.data.stats[5].base_stat,
                    types: resp.data.types
                })
                })
                }
                axios.get(`https://pokeapi.co/api/v2/pokemon/${response.data.chain.evolves_to[0].species.name}`)
                .then((r) => {
                    
                   evolutions.unshift({
                    id: r.data.id,
                    name: r.data.name,
                    background_image: r.data.sprites.other['official-artwork'].front_default,
                    weight: r.data.weight,
                    hp: r.data.stats[0].base_stat,
                    attack: r.data.stats[1].base_stat,
                    defense: r.data.stats[2].base_stat,
                    speed: r.data.stats[5].base_stat,
                    types: r.data.types
                })

                //  return res.json({evolutions})
                })
            }
            setTimeout(() => {axios.get(`https://pokeapi.co/api/v2/pokemon/${response.data.chain.species.name}`)
                .then((r) => {
                    
                   evolutions.unshift({
                    id: r.data.id,
                    name: r.data.name,
                    background_image: r.data.sprites.other['official-artwork'].front_default,
                    weight: r.data.weight,
                    hp: r.data.stats[0].base_stat,
                    attack: r.data.stats[1].base_stat,
                    defense: r.data.stats[2].base_stat,
                    speed: r.data.stats[5].base_stat,
                    types: r.data.types
                })

                 return res.json({evolutions})})
            }, 1000)
         })
        })

module.exports = router;