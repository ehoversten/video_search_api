const router = require('express').Router();
const { isAuthorized } = require('../utils/auth');

const Favorite = require('../models/Favorites');
const User = require('../models/User');

router.get('/', isAuthorized, async (req, res) => {
  try {
    const favorites = await Favorite.find({})
      .populate('addedBy')
    res.status(200).json(favorites);
    // res.status(200).json({ msg: 'Base Favorite Route'});
  } catch (err) {
    return res
      .status(400)
      .json({ msg: 'Could not complete request', error: err });
  }
});

router.post('/create', isAuthorized, async (req, res) => {
  console.log("Hit Create Server Route");
  console.log(req.body);
  try {
    // const { video_id, video_url, video_title, video_channel, video_description, video_published, video_img } = req.body;
    
    let temp = {
      video_id: req.body.id.videoId,
      video_url: req.body.id.videoId,
      video_title: req.body.snippet.title,
      video_channel: req.body.snippet.channelTitle,
      video_description: req.body.snippet.description,
      video_published: req.body.snippet.publishTime,
      video_img: req.body.snippet.thumbnails.high.url
    }
    
    // Add Validation
    // if (!title) {
      //   res.status(400).json({ msg: 'Required field(s) missing' });
      // }
      
      // Make sure Item doesn't already exist in DB 
      const foundFavoriteItem = await Favorite.findOne({
        video_id: req.body.id.videoId,
      });
      
      if (foundFavoriteItem) {
        // // console.log(foundFavoriteItem);
        // const id = req.user;
        // // console.log(id);
        // const currentUser = await User.findByIdAndUpdate({ _id: id }, { $push: { user_favorites: foundFavoriteItem._id }})
        // console.log(currentUser);

        return res.status(400).json({
          message: 'Item under that name already exists',
          data: foundFavoriteItem,
        });
      }
      
      const newFavoriteItem = new Favorite(temp);
      console.log(typeof newFavoriteItem);
      console.log(newFavoriteItem);
      console.log("Favorite Created");
      // // Save Item to DB
      const savedFavoriteItem = await newFavoriteItem.save();
      console.log("Saved favorite");
      console.log(savedFavoriteItem);
      // -- Grab User -- //
      const id = req.user;
      console.log(id);
      const currentUser = await User.findByIdAndUpdate({ _id: id }, { $push: { user_favorites: savedFavoriteItem._id }});
      console.log(currentUser);

    // let savingOp = await user.favorites.push(savedFavoriteItem._id); // returns length of array

    // const savedUser = user.save();
    res.status(200).json({ favorite: savedFavoriteItem, currentUser });
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


