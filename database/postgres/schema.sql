DROP TABLE IF EXISTS properties, nearby_properties, properties_lists, lists, users CASCADE;

CREATE TABLE properties (
  id serial PRIMARY KEY,
  average_rating numeric(3,2),
  review_count int,
  bed_count smallint,
  house_type varchar(10),
  nightly_price numeric(7,2),
  image_name varchar(50),
  image_description varchar(200),
  image_url varchar(200)
);

CREATE TABLE nearby_properties (
  id serial PRIMARY KEY
);

CREATE TABLE properties_lists (
  id serial PRIMARY KEY
);

CREATE TABLE lists (
  id serial PRIMARY KEY,
  name varchar(50),
  image_url varchar(200)
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  name varchar(200),
  email varchar(200),
  password varchar(200),
  role varchar(10),
  is_superhost boolean
);

ALTER TABLE properties
ADD COLUMN host_id int REFERENCES users (id);

ALTER TABLE nearby_properties
ADD COLUMN origin_property_id int REFERENCES properties (id),
ADD COLUMN nearby_property_id int REFERENCES properties (id);

ALTER TABLE properties_lists
ADD COLUMN property_id int REFERENCES properties (id),
ADD COLUMN list_id int REFERENCES lists (id);

ALTER TABLE lists
ADD COLUMN user_id int REFERENCES users (id);
