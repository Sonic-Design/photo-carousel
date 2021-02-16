/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const compression = require('compression');

const app = express();
const port = 3004;
const path = require('path');
// const controllers = require('./controllers/imageController.js');
const properties = require('./controllers/properties.js');

app.use(compression());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/loaderio-e43fd610bd1010cd1cd35f11e029652e', express.static(path.join(__dirname, '../loaderio')));
app.use('/:id/bundle', express.static(path.join(__dirname, '../public/bundle.js')));
app.use('/:id', express.static(path.join(__dirname, '../public')));

// app.get('/api/img_carousel/:id', controllers.getPictures);

app.get('/api/properties/:propertyId/nearby', properties.getNearbyProperties);
app.post('/api/properties', properties.addProperty);

app.listen(port, () => {
  console.log(`Photo Carousel App listening at http://localhost:${port}`);
});

module.exports = {
  app,
  port,
};
