require('dotenv').config();
const { Pool } = require('pg');

const defaultPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DEFAULT,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTables = async () => {
  const client = await pool.connect();
  try {
    const createBrandsTableQuery = `
      CREATE TABLE IF NOT EXISTS brands (
        brand_id SERIAL PRIMARY KEY,
        brand_name VARCHAR(100),
        country_origin VARCHAR(100),
        year_foundation INT,
        founder VARCHAR(100)
      );
    `;
    await client.query(createBrandsTableQuery);
    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas', err);
  } finally {
    client.release();
  }
};

const initializeDatabase = async () => {
  const client = await defaultPool.connect();
  try {
    const dbExistsQuery = `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}';`;
    const dbExistsResult = await client.query(dbExistsQuery);

    if (dbExistsResult.rows.length === 0) {
      await client.query(`CREATE DATABASE ${process.env.DB_NAME};`);
      console.log(`Banco de dados ${process.env.DB_NAME} criado com sucesso!`);
    } else {
      console.log(`Banco de dados ${process.env.DB_NAME} já existe.`);
    }
  } catch (err) {
    console.error('Erro ao verificar/criar banco de dados', err);
  } finally {
    client.release();
  }

  await createTables();
};

initializeDatabase()