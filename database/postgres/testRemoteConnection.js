const { Pool } = require('pg');
const { user, host, password } = require('./ec2Config.js');

const pool = new Pool({
  user,
  host,
  password,
  database: 'sonicd3',
  port: 5432,
});

const testQuery = (callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err);
    } else {
      const { database } = client.connectionParameters;
      client.query('SELECT * FROM test_table', null, (err, res) => {
        done();
        if (err) {
          callback(err);
        } else {
          callback(null, res, database);
        }
      });
    }
  });
};

testQuery((err, res, database) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  } else {
    console.log(`Successfully connected to database ${database}`);
    console.log(res.rows);
    process.exit(0);
  }
});
