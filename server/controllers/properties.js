const properties = require('../models/properties.js');

module.exports.getNearbyProperties = (req, res) => {
  const { propertyId } = req.params;
  properties.getNearbyProperties(propertyId, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.addProperty = (req, res) => {
  const propertyData = req.body;
  properties.addProperty(propertyData, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};
