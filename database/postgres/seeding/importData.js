/* eslint-disable no-console */

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'sonicd2',
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

const tableFieldNames = {
  users: 'name, email, password, role, is_superhost',
  properties: 'average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id',
  nearby_properties: 'origin_property_id, nearby_property_id',
};

const queries = {
  dropTables: 'DROP TABLE IF EXISTS nearby_properties, properties, users CASCADE;',
  createTables: `CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(200),
    email varchar(200),
    password varchar(200),
    role varchar(10),
    is_superhost boolean
  );
  CREATE TABLE properties (
    id serial PRIMARY KEY,
    average_rating numeric(3,2),
    review_count int,
    bed_count smallint,
    house_type varchar(10),
    nightly_price numeric(7,2),
    image_name varchar(50),
    image_description varchar(200),
    image_url varchar(200),
    host_id int REFERENCES users (id)
  );
  CREATE TABLE nearby_properties (
    id serial PRIMARY KEY,
    origin_property_id int REFERENCES properties (id),
    nearby_property_id int REFERENCES properties (id)
  );`,
  // insertRecords: `COPY $1 ($2)
  // FROM '$3'
  // DELIMITER ';'
  // CSV HEADER;`,
};

const insertRecords = (placeholderValues, callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err);
    } else {
      const { database } = client.connectionParameters;
      const [tableName, fieldNames, filePath] = placeholderValues;
      // client.query(queries.insertRecords, placeholderValues, (err, res) => {
      client.query(`COPY ${tableName}(${fieldNames})
      FROM '${filePath}'
      DELIMITER ';'
      CSV HEADER;`, null, (err, res) => {
      // CSV HEADER;`, placeholderValues, (err, res) => {
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

const createTables = (callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err);
    } else {
      // console.log(`createTables successfully connected to PostgreSQL database ${client.connectionParameters.database}`);
      client.query(queries.createTables, null, (err, res) => {
        done();
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
    }
  });
};

const dropTables = (callback) => {
  pool.connect((err, client, done) => {
    if (err) {
      callback(err);
    } else {
      // console.log(`dropTables successfully connected to PostgreSQL database ${client.connectionParameters.database}`);
      client.query(queries.dropTables, null, (err, res) => {
        done();
        if (err) {
          callback(err);
        } else {
          createTables(callback);
        }
      });
    }
  });
};

module.exports.restartTables = (callback) => {
  dropTables((err, res) => {
    if (err) {
      callback(err);
    } else {
      // console.log('Successfully ran restartTables');
      // console.log(res);
      callback(null, res);
    }
  });
};

module.exports.handleInsertRecords = (tableName, filePath, callback) => {
  const fieldNames = tableFieldNames[tableName];
  const placeholderValues = [tableName, fieldNames, filePath];
  insertRecords(placeholderValues, (err, res, database) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res, database);
    }
  });
};
