const router = require('express').Router();
const apiController = require('../controllers/apiController');

// @@ Route : /api
// @@ QUERY API ROUTE
// @@ POST 
router.post('/', apiController.searchQuery);

module.exports = router;




// const router = require('express').Router();
// const searchAPI = require('../utils/API');

// router.post('/', (req, res) => {
//     let querySearch = req.body.query;
//     // -- Query API -- //
//     searchAPI(querySearch)
//         .then(response => {
//             return res.status(200).json(response.data);
//         })
//         .catch(err => {
//             const errMsg = err.stack;
//             let message = 'Could not complete request';
//             return res.status(500).json({ error: message, errMsg, err });
//         });
// });





