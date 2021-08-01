const express = require('express');

const router = express.Router();

const { Op } = require('sequelize');
const axios = require('axios')

const { Pokemon, Types } = require('../db');

function onOrder(param, array) {
  switch (param) {
    case 'A-Z': return array.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    });
    case 'Z-A': return array.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (b.name < a.name) return -1;
      return 0;
    });
    default: return array;
  }
}

function onOrderFilter(param, array) {
  switch (param) {
    case 'A-Z': return array.sort((a, b) => {
      if (a.pokemon.name > b.pokemon.name) return 1;
      if (b.pokemon.name > a.pokemon.name) return -1;
      return 0;
    });
    case 'Z-A': return array.sort((a, b) => {
      if (a.pokemon.name < b.pokemon.name) return 1;
      if (b.pokemon.name < a.pokemon.name) return -1;
      return 0;
    });
    default: return array;
  }
}

router.get('/', (req, res, next) => {
  const {
    page, filter, order, name,
  } = req.query;
  if (filter !== '') {
    axios.get(`https://pokeapi.co/api/v2/type/${filter}?limit=100`)
      .then((response) => {
        if(name !== '') {
          const filtered = response.data.pokemon.filter((p) => p.pokemon.name.includes(name) === true)
          const totalPages = Math.ceil(filtered.length / 15)
          return res.json ({
            pokemons: filtered.slice((page - 1) * 15, page * 15),
            totalPages
          })
        }
        if (order !== '') {
          onOrderFilter(order, response.data.pokemon);
        }
        return res.json({
          pokemons: response.data.pokemon.slice((page - 1) * 15, page * 15),
          totalPages: Math.ceil(response.data.pokemon.length / 15),
        });
      }).catch((e) => {
        next(e);
      });
  }
  if (filter === '') {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=800`)
      .then((response) => {
        if(name !== '') {
          const filtered = response.data.results.filter((p) => p.name.includes(name) === true)
          const totalPages = Math.ceil(filtered.length / 15)
          return res.json ({
            pokemons: filtered.slice((page - 1) * 15, page * 15),
            totalPages
          })
        }
        if (order !== '') {
          onOrder(order, response.data.results);
        }
        return res.json({
          pokemons: response.data.results.slice((page - 1) * 15, page * 15),
          totalPages: Math.ceil(response.data.results.length / 15),
        });
      }).catch((e) => {
        next(e);
      });
  }
});

module.exports = router;