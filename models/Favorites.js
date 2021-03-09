const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Favorites = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    timesViewed: {
      type: Number,
    },
    isPublic: {
      type: Boolean,
    },
    // videos:{} list of videos?
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model('Favorites', Favorites);

module.exports = Favorite;
