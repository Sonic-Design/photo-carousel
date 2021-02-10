/* eslint-disable no-console */

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'sonicdesign',
  port: 5432,
});

client.connect((err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Successfully connected to PostgreSQL database ${res.connectionParameters.database}`);
  }
});

process.on('SIGINT', () => {
  client.end()
    .then(() => {
      console.log('\nPostgreSQL database connection has been closed');
      const { pid } = process;
      console.log(`About to exit Node process ID ${pid}`);
      process.exit(0);
    })
    .catch(console.error);
});

module.exports = {
  client,
};
