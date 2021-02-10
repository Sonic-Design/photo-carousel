const db = require('../../database/postgres').client;

const nearbyQuery = 'SELECT p1.id as origin_property_id, p2.*, u.is_superhost FROM properties p1 INNER JOIN nearby_properties np ON p1.id = np.origin_property_id INNER JOIN properties p2 ON np.nearby_property_id = p2.id INNER JOIN users u ON p2.host_id = u.id WHERE p1.id = $1';

const addQuery = 'INSERT INTO properties (average_rating, review_count, bed_count, house_type, nightly_price, image_name, image_description, image_url, host_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

module.exports.getNearbyProperties = (id, callback) => {
  db.query(nearbyQuery, [id])
    .then((res) => {
      callback(null, res.rows);
    })
    .catch(callback);
};

module.exports.addProperty = ({
  averageRating,
  reviewCount,
  bedCount,
  houseType,
  nightlyPrice,
  imageName,
  imageDescription,
  imageUrl,
  hostId,
}, callback) => {
  db.query(addQuery, [
    averageRating,
    reviewCount,
    bedCount,
    houseType,
    nightlyPrice,
    imageName,
    imageDescription,
    imageUrl,
    hostId,
  ])
    .then((res) => callback(null, res))
    .catch(callback);
};
