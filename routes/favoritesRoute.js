const router = require('express').Router();
const { isAuthorized } = require('../utils/auth');

const Favorite = require('../models/Favorites');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find({})
      .populate('addedBy')
    res.status(200).json(favorites);
  } catch (err) {
    return res
      .status(400)
      .json({ msg: 'Could not complete request', error: err });
  }
});

router.post('/create', isAuthorized, async (req, res) => {
  try {
    const { title } = req.body;
    const id = req.user || req.body.addedBy;
    console.log(id);
    if (!title) {
      res.status(400).json({ msg: 'Required field(s) missing' });
    }

    const foundFavoriteItem = await Favorite.findOne({
      title: req.body.title,
    });

    if (foundFavoriteItem) {
      return res.status(400).json({
        message: 'Item under that name already exists',
      });
    }

    const newFavoriteItem = new Favorite(req.body);
    // Save Item to DB
    const savedFavoriteItem = await newFavoriteItem.save();
    const user = await User.findById(id);

    // let savingOp = await user.favorites.push(savedFavoriteItem._id); // returns length of array
    // const savedUser = user.save();
    res.status(200).json({ favorite: savedFavoriteItem, user });
  } catch (err) {
    res.status(500).json({ error: 'Request could not be completed' });
  }
});

router.put('/:favorite_id', isAuthorized, async (req, res) => {
  try {
    const id = req.params.favorite_id || req.body.favorite_id;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ msg: 'Title is required' });
    }
    const favoriteItem = await Favorite.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    let savedFavoriteItem = await favoriteItem.save();
    return res.status(200).json({ favorite: savedFavoriteItem });
  } catch (err) {
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, err });
  }
});

router.delete('/:favorite_id', isAuthorized, async (req, res) => {
  try {
    const id = req.params.favorite_id || req.body.favorite_id;
    const foundFavoriteItem = await Favorite.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ msg: 'Deleted', favorite: foundFavoriteItem });
  } catch (err) {
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, err });
  }
});

module.exports = router;


