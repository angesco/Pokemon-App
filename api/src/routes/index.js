const { Router } = require('express');


const pokemons = require('./pokemons.js');

const bodyParser = require('body-parser');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/pokemons', pokemons);

module.exports = router;
