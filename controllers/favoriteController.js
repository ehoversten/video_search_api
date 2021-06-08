const { isAuthorized } = require('../utils/auth');

const Favorite = require('../models/Favorites');
const User = require('../models/User');

module.exports = {
    getAll: async (req, res) => {
        try {
            const favorites = await Favorite.find({}).populate('addedBy');
            res.status(200).json(favorites);
        } catch (err) {
            return res
            .status(400)
            .json({ msg: 'Could not complete request', error: err });
        }
    },
    getOne: async (req, res) => {
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
    },
    findFavorite: async (req, res) => {
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
    },
    add: async (req, res) => {

        console.log("Adding Favorite...")
        console.log(req.body)
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
    },
    delete: async (req, res) => {
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
    }
}