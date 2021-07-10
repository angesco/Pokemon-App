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
    case 'minPrice': return array.sort((a, b) => (
      (a.priceDiscount ? a.priceDiscount : a.price) - (b.priceDiscount ? b.priceDiscount : b.price)
    ));
    case 'maxPrice': return array.sort((a, b) => (
      (b.priceDiscount ? b.priceDiscount : b.price) - (a.priceDiscount ? a.priceDiscount : a.price)
    ));
    case 'minRating': return array.sort((a, b) => (
      a.rating - b.rating
    ));
    case 'maxRating': return array.sort((a, b) => (
      b.rating - a.rating
    ));
    default: return array;
  }
}

router.get('/', (req, res, next) => {
  const {
    page, filter, order, name,
  } = req.query;
  if (filter !== '') {
    Pokemon.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: [{ model: Category, where: { name: { [Op.like]: `%${filter}%` } }, attributes: ['id', 'name'] }],
    })
      .then((response) => {
        if (order !== '') {
          onOrder(order, response);
        }
        return res.json({
          pokemons: response.slice((page - 1) * 9, page * 9),
          totalPages: Math.ceil(response.length / 9),
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