const db = require('../../database/mongo/index.js');

const getPictures = (params, cb) => {
  db.CarouselModel.find({ id: params.id }, cb);
};

module.exports = {
  getPictures,
};
