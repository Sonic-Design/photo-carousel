const db = require('../../database/index.js');

const getPictures = (params, cb) => {
  db.CarouselModel.find({ id: params.id }, cb);
};

module.exports = {
  getPictures,
};
