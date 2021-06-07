// const router = require('express').Router();
const searchAPI = require('../utils/API');

module.exports = {
    searchQuery: (req, res) => {
        let querySearch = req.body.query;
    // -- Query API -- //
        searchAPI(querySearch)
            .then(response => {
                return res.status(200).json(response.data);
            })
            .catch(err => {
                const errMsg = err.stack;
                let message = 'Could not complete request';
                return res.status(500).json({ error: message, errMsg, err });
            });
    }
}
// @@ Route : /api
// @@ QUERY API ROUTE
// @@ 
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


// module.exports = router;