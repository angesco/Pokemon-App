const { Type } = require('../db')
const axios = require('axios')
const router = require('express').Router();


router.get('/', async (req, res, next) =>{
    const myTypes = await Type.findAll();
    if(myTypes.length > 0){
      res.json(myTypes)
    } else {
    const typesApi = axios.get(`https://pokeapi.co/api/v2/type`)
    .then(response => {
      res.json(response.data.results)
      response.data.results.forEach((t) => {
        let types = Type.findOrCreate({
          where:{
            name: t.name 
          }
        })
        return types
      })
    }).catch(err => next(err))}
  });

  module.exports = router;