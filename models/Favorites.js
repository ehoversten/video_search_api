const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema(
  {
    video_id: {
      type: String,
      trim: true,
      required: true
    },
    video_url: {
      type: String,
      trim: true,
      required: true
    },
    video_title: {
      type: String,
      trim: true,
      required: true
    },
    video_channel: {
      type: String,
      trim: true,
      required: true
    },
    video_description: {
      type: String,
      trim: true,
      required: true
    },
    video_published: {
      type: String,
      trim: true,
      required: true
    },
    video_img: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
