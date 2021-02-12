/* eslint-disable no-console */

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'sonicdesign',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

process.on('SIGINT', () => {
  const { pid } = process;
  console.log(`\nExiting Node process ID ${pid}`);
  process.exit(0);
});

module.exports = {
  pool,
};
