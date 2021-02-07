DROP TABLE IF EXISTS test_table_1;
DROP TABLE IF EXISTS tt1;
DROP TABLE IF EXISTS tt2;

CREATE TABLE tt1 (
  id serial PRIMARY KEY,
  string_col varchar(50),
  number_col int,
  boollike_col boolean
);

INSERT INTO tt1 (
  string_col,
  number_col,
  boollike_col
) VALUES (
  'a big hole in the ground',
  5,
  FALSE
), (
  'elasticity',
  27,
  TRUE
), (
  'phantastic',
  999,
  TRUE
), (
  '考えが明らかでない',
  12,
  FALSE
), (
  'you eat when I say you eat',
  0,
  FALSE
);

CREATE TABLE tt2 (
  id serial,
  tt1_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (tt1_id) REFERENCES tt1
);

INSERT INTO tt2 (tt1_id) VALUES
(5),
(5),
(4),
(3),
(2),
(1);
