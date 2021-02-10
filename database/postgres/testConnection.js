/* eslint-disable no-console */

const { Client } = require('pg');

// const connectAndQuery = async () => {
//   const client = new Client({
//     host: 'localhost',
//     database: 'testDB1',
//     port: 5432,
//   });
//   await client.connect();
//   const res = await client.query('SELECT * FROM tt1 t1 INNER JOIN tt2 t2 ON t1.id = t2.tt1_id');
//   console.log(res.rowCount);
//   console.log(res.rows);
// await client.end();
// };

// connectAndQuery();

/* ************************************************************* */

const client = new Client({
  host: 'localhost',
  database: 'testDB1',
  port: 5432,
});

client.connect((err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Successfully connected to PostgreSQL database ${res.connectionParameters.database}`);
  }
});

client.query('SELECT * FROM tt1 t1 INNER JOIN tt2 t2 ON t1.id = t2.tt1_id;')
  .then((res) => {
    console.log(res.rowCount);
    console.log(res.rows);
  })
  .catch(console.error)
  .finally(() => {
    client.end()
      .then(() => console.log('PostgreSQL database connection has been closed'))
      .catch(console.error);
  });
