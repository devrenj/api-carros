const { express } = require("express")
const router = express.Router()
const { client } = require('../db')


// Rota para criar uma nova marca
router.post('/brands', async (req, res, next) => {
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
router.get('/brands', async (req, res, next) => {
    try {
      const { brandName } = req.query; // Supondo que você está buscando por nome
  
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

module.exports = router