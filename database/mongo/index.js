const mongoose = require('mongoose');

// use for proxy server
// mongodb://localhost/photo_carousel'
const url = process.env.CONNECTIONSTRING || 'mongodb://localhost/photo_carousel';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const { Schema, connection } = mongoose;

const CarouselSchema = new Schema({
  id: Number,
  stayList: Array,
  ImgUrls: Array,
});

const StayEntry = new Schema({
  stayId: Number,
  stayName: String,
  stayPic: String,
});

const CarouselModel = mongoose.model('CarouselModel', CarouselSchema);
const StayModel = mongoose.model('StayModel', StayEntry);

module.exports = {
  CarouselModel,
  StayModel,
  connection,
};
