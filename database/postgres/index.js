/* eslint-disable no-console */

// const { Client } = require('pg');
const { Pool } = require('pg');

// const client = new Client({
const pool = new Pool({
  host: 'localhost',
  database: 'sonicdesign',
  port: 5432,
});

// client.connect((err, res) => {
// // pool.connect((err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(`Successfully connected to PostgreSQL database ${res.connectionParameters.database}`);
//   }
// });

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// process.on('SIGINT', () => {
//   client.end()
//     .then(() => {
//       console.log('\nPostgreSQL database connection has been closed');
//       const { pid } = process;
//       console.log(`Exiting Node process ID ${pid}`);
//       process.exit(0);
//     })
//     .catch(console.error);
// });

process.on('SIGINT', () => {
  const { pid } = process;
  console.log(`\nExiting Node process ID ${pid}`);
  process.exit(0);
});

module.exports = {
  // client,
  pool,
};
