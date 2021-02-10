/* eslint-disable no-console */

const { Client } = require('pg');
// const { Pool } = require('pg');

const client = new Client({
// const pool = new Pool({
  host: 'localhost',
  database: 'sonicdesign',
  port: 5432,
});

client.connect((err, res) => {
// pool.connect((err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Successfully connected to PostgreSQL database ${res.connectionParameters.database}`);
  }
});

process.on('SIGINT', () => {
  client.end()
  // pool.end()
    .then(() => {
      console.log('\nPostgreSQL database connection has been closed');
      const { pid } = process;
      console.log(`Exiting Node process ID ${pid}`);
      process.exit(0);
    })
    .catch(console.error);
});

module.exports = {
  client,
  // pool,
};
