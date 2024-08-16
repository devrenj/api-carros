const express = require('express');
const router = express.Router();
const { client } = require('../config/db')


// Rota para criar uma nova marca
router.post('/', async (req, res, next) => {
    try {
      const { brandName, countryOrigin, yearFoundation, founder } = req.body;
  
      const result = await client.query(
        `INSERT INTO brands (brand_name, country_origin, year_foundation, founder)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [brandName, countryOrigin, yearFoundation, founder]
      );
  
      res.json(result.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
});
  
// Rota para buscar uma marca pelo nome
router.get('/', async (req, res, next) => {
    try {
      const { brandName } = req.query; // Supondo que você está buscando por nome

      if (!brandName) {
        return res.status(400).json({ message: 'Brand name is required' });
      }
  
      const result = await client.query(
        `SELECT * FROM brands WHERE brand_name = $1`,
        [brandName]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Brand not found' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
});

router.get('/test', (req, res) => {
  try {
    // Pega o valor do parâmetro de consulta 'result'
    const { result } = req.query;

    // Verifica se 'result' está presente
    if (!result) {
      return res.status(400).json({ message: 'No result provided in the query parameters' });
    }

    // Retorna o valor do parâmetro de consulta
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router