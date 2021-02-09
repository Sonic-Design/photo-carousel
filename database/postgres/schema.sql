-- DROP TABLE IF EXISTS properties, nearby_properties, properties_lists, lists, users CASCADE;

DROP DATABASE IF EXISTS sonicdesign;

CREATE DATABASE sonicdesign;

\c sonicdesign;

CREATE TABLE users (
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

-- CREATE TABLE lists (
--   id serial PRIMARY KEY,
--   name varchar(50),
--   image_url varchar(200),
--   user_id int REFERENCES users (id)
-- );

CREATE TABLE nearby_properties (
  id serial PRIMARY KEY,
  origin_property_id int REFERENCES properties (id),
  nearby_property_id int REFERENCES properties (id)
);

-- CREATE TABLE properties_lists (
--   id serial PRIMARY KEY,
--   property_id int REFERENCES properties (id),
--   list_id int REFERENCES lists (id)
-- );

COPY users(name, email, password, role, is_superhost)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/users0.csv'
DELIMITER ';'
CSV HEADER;
COPY users(name, email, password, role, is_superhost)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/users1.csv'
DELIMITER ';'
CSV HEADER;
COPY users(name, email, password, role, is_superhost)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/users2.csv'
DELIMITER ';'
CSV HEADER;
COPY users(name, email, password, role, is_superhost)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/users3.csv'
DELIMITER ';'
CSV HEADER;
COPY users(name, email, password, role, is_superhost)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/users4.csv'
DELIMITER ';'
CSV HEADER;
COPY users(name, email, password, role, is_superhost)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/users5.csv'
DELIMITER ';'
CSV HEADER;
COPY users(name, email, password, role, is_superhost)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/users6.csv'
DELIMITER ';'
CSV HEADER;
COPY users(name, email, password, role, is_superhost)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/users7.csv'
DELIMITER ';'
CSV HEADER;
COPY users(name, email, password, role, is_superhost)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/users8.csv'
DELIMITER ';'
CSV HEADER;
COPY users(name, email, password, role, is_superhost)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/users9.csv'
DELIMITER ';'
CSV HEADER;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

COPY properties(average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/properties0.csv'
DELIMITER ';'
CSV HEADER;
COPY properties(average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/properties1.csv'
DELIMITER ';'
CSV HEADER;
COPY properties(average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/properties2.csv'
DELIMITER ';'
CSV HEADER;
COPY properties(average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/properties3.csv'
DELIMITER ';'
CSV HEADER;
COPY properties(average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/properties4.csv'
DELIMITER ';'
CSV HEADER;
COPY properties(average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/properties5.csv'
DELIMITER ';'
CSV HEADER;
COPY properties(average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/properties6.csv'
DELIMITER ';'
CSV HEADER;
COPY properties(average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/properties7.csv'
DELIMITER ';'
CSV HEADER;
COPY properties(average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/properties8.csv'
DELIMITER ';'
CSV HEADER;
COPY properties(average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/properties9.csv'
DELIMITER ';'
CSV HEADER;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

COPY nearby_properties(origin_property_id, nearby_property_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/nearby_properties0.csv'
DELIMITER ';'
CSV HEADER;
COPY nearby_properties(origin_property_id, nearby_property_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/nearby_properties1.csv'
DELIMITER ';'
CSV HEADER;
COPY nearby_properties(origin_property_id, nearby_property_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/nearby_properties2.csv'
DELIMITER ';'
CSV HEADER;
COPY nearby_properties(origin_property_id, nearby_property_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/nearby_properties3.csv'
DELIMITER ';'
CSV HEADER;
COPY nearby_properties(origin_property_id, nearby_property_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/nearby_properties4.csv'
DELIMITER ';'
CSV HEADER;
COPY nearby_properties(origin_property_id, nearby_property_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/nearby_properties5.csv'
DELIMITER ';'
CSV HEADER;
COPY nearby_properties(origin_property_id, nearby_property_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/nearby_properties6.csv'
DELIMITER ';'
CSV HEADER;
COPY nearby_properties(origin_property_id, nearby_property_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/nearby_properties7.csv'
DELIMITER ';'
CSV HEADER;
COPY nearby_properties(origin_property_id, nearby_property_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/nearby_properties8.csv'
DELIMITER ';'
CSV HEADER;
COPY nearby_properties(origin_property_id, nearby_property_id)
FROM '/Users/errol/Documents/Dev/_Hack Reactor/_HRSF132/Sprints/SDC/seed-data/R30 (full set of data v3)/nearby_properties9.csv'
DELIMITER ';'
CSV HEADER;
