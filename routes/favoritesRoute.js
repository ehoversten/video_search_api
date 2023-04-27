const router = require('express').Router();
const { isAuthorized } = require('../utils/auth');

const Favorite = require('../models/Favorites');
const User = require('../models/User');

router.get('/', isAuthorized, async (req, res) => {
  try {
    // const favorites = await Favorite.find({}).populate('addedBy');
    const favorites = await Favorite.find({}).populate('addedBy');
    console.log("Favs: ", favorites);
    res.status(200).json(favorites);
    // res.status(200).json({ msg: 'Base Favorite Route'});
  } catch (err) {
    return res
      .status(400)
      .json({ msg: 'Could not complete request', error: err });
  }
});

router.get('/:favorite_id', isAuthorized, async (req, res) => {
  try {
    const id = req.params.favorite_id;
    const foundFavoriteVideo = await Favorite.findById(id).exec();
    if (!foundFavoriteVideo) {
      return res.status(400).json({ msg: 'Not Found' });
    }

    return res.status(200).json({ favorite: foundFavoriteVideo });
  } catch (err) {
    console.log(err.stack);
    const errMsg = err.stack;
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, errMsg, err });
  }
});
router.get('/find/:id', isAuthorized, async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    const foundFavoriteItem = await Favorite.findOne({
      video_id:id,
    });
    if (!foundFavoriteItem) {
      return res.status(400).json({ msg: 'Not Found' });
    }

    return res.status(200).json({ favorite: foundFavoriteItem });
  } catch (err) {
    console.log(err.stack);
    const errMsg = err.stack;
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, errMsg, err });
  }
});


router.post('/create', isAuthorized, async (req, res) => {
  console.log('Body obj on create route', req.body);
  try {
    // const { video_id, video_url, video_title, video_channel, video_description, video_published, video_img } = req.body;

    let temp = req.body;

    // Add Validation
    // if (!title) {
    //   res.status(400).json({ msg: 'Required field(s) missing' });
    // }

    // Make sure Item doesn't already exist in DB
    const foundFavoriteItem = await Favorite.findOne({
      video_id: req.body.video_id,
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

    console.log('Favorite Created');
    // // Save Item to DB
    const savedFavoriteItem = await newFavoriteItem.save();
    console.log('Saved favorite');
    console.log(savedFavoriteItem);
    // -- Grab User -- //
    const id = req.user;
    console.log("User Id: ", id);
    const currentUser = await User.findByIdAndUpdate(
      { _id: id },
      // { $push: { user_favorites: savedFavoriteItem._id } }
      { $addToSet: { user_favorites: savedFavoriteItem._id } },
      { new: true }
    );
    console.log("Current User: ", currentUser);

    // let savingOp = await user.favorites.push(savedFavoriteItem._id); // returns length of array

    // const savedUser = user.save();
    res.status(200).json({ favorite: savedFavoriteItem, currentUser });
  } catch (err) {
    console.log('Error!', err);
    res.status(500).json({ error: 'Request could not be completed' });
  }
});


// router.put('/:favorite_id', isAuthorized, async (req, res) => {
//   try {
//     const id = req.params.favorite_id || req.body.favorite_id;
//     const { title } = req.body;
//     if (!title) {
//       return res.status(400).json({ msg: 'Title is required' });
//     }
//     const favoriteItem = await Favorite.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     let savedFavoriteItem = await favoriteItem.save();
//     return res.status(200).json({ favorite: savedFavoriteItem });
//   } catch (err) {
//     let message = 'Could not complete request';
//     return res.status(500).json({ error: message, err });
//   }
// });

router.delete('/:favorite_id', isAuthorized, async (req, res) => {
  try {
    const id = req.params.favorite_id || req.body.favorite_id;

    const foundFavoriteItem = await Favorite.findByIdAndDelete(id).exec();
    // Query User
    console.log(req.user);

    const result = await User.findByIdAndUpdate(
      req.user,
      {
        $pull: {
          user_favorites: foundFavoriteItem._id,
        },
      },
      { new: true }
    ).exec();

    if (result) console.log('results', result.user_favorites);

    return res.status(200).json({ msg: 'Deleted', user: { result } });
    // .json({ msg: 'Deleted', favorite: foundFavoriteItem, user: { result } });
  } catch (err) {
    let errMsg = err.stack;
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, err, errMsg });
  }
});

module.exports = router;
// https://stackoverflow.com/questions/19786075/mongoose-deleting-pull-a-document-within-an-array-does-not-work-with-objectid
