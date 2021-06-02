const router = require('express').Router();
const { isAuthorized } = require('../utils/auth');

const Favorite = require('../models/Favorites');
const User = require('../models/User');

// @@ Route : /favorites
router.get('/', isAuthorized, async (req, res) => {
  try {
    const favorites = await Favorite.find({}).populate('addedBy');
    res.status(200).json(favorites);
  } catch (err) {
    return res
      .status(400)
      .json({ msg: 'Could not complete request', error: err });
  }
});

// @@ FAVORITE DETAIL ROUTE
// @@
router.get('/:favorite_id', isAuthorized, async (req, res) => {
  try {
    const id = req.params.favorite_id;
    const foundFavoriteVideo = await Favorite.findById(id).exec();
    if (!foundFavoriteVideo) {
      return res.status(400).json({ msg: 'Not Found' });
    }

    return res.status(200).json({ favorite: foundFavoriteVideo });
  } catch (err) {
    const errMsg = err.stack;
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, errMsg, err });
  }
});

// @@ FAVORITE DETAIL ROUTE ??
// @@
router.get('/find/:id', isAuthorized, async (req, res) => {
  try {
    const id = req.params.id;
    const foundFavoriteItem = await Favorite.findOne({
      video_id:id,
    });
    if (!foundFavoriteItem) {
      return res.status(400).json({ msg: 'Not Found' });
    }

    return res.status(200).json({ favorite: foundFavoriteItem });
  } catch (err) {
    const errMsg = err.stack;
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, errMsg, err });
  }
});

// @@ FAVORITE CREATE ROUTE
// @@
router.post('/create', isAuthorized, async (req, res) => {
  try {
    // Add Validation
    // if (!title) {
    //   res.status(400).json({ msg: 'Required field(s) missing' });
    // }

    // Make sure Item doesn't already exist in DB
    const foundFavoriteItem = await Favorite.findOne({
      video_id: req.body.video_id,
    });

    if (foundFavoriteItem) {
      return res.status(400).json({
        message: 'Item under that name already exists',
        data: foundFavoriteItem,
      });
    }

    const newFavoriteItem = new Favorite(temp);

    // --> Save Item to DB
    const savedFavoriteItem = await newFavoriteItem.save();

    // -- Get User -- //
    const id = req.user;
    const currentUser = await User.findByIdAndUpdate(
      { _id: id },
      { $push: { user_favorites: savedFavoriteItem._id } }
    );

    res.status(200).json({ favorite: savedFavoriteItem, currentUser });
  } catch (err) {
    const errMsg = err.stack;
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, errMsg, err });
  }
});

// @@ FAVORITE DELETE ROUTE
// @@
router.delete('/:favorite_id', isAuthorized, async (req, res) => {
  try {
    const id = req.params.favorite_id || req.body.favorite_id;

    const foundFavoriteItem = await Favorite.findByIdAndDelete(id).exec();
    
    // Query User
    const result = await User.findByIdAndUpdate(
      req.user,
      {
        $pull: {
          user_favorites: foundFavoriteItem._id,
        },
      },
      { new: true }
    ).exec();

    return res.status(200).json({ msg: 'Deleted', user: { result } });
  } catch (err) {
    let errMsg = err.stack;
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, err, errMsg });
  }
});

module.exports = router;
// https://stackoverflow.com/questions/19786075/mongoose-deleting-pull-a-document-within-an-array-does-not-work-with-objectid
