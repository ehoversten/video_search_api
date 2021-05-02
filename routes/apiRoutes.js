const router = require('express').Router();
const searchAPI = require('../utils/API');
const {isAuthorized} = require('../utils/auth');


router.post('/', (req, res) => {
    // console.log("In server API call Route ...")
    // console.log(req.body);
    let querySearch = req.body.query;
    console.log(`User: ${req.user}`);
    // -- WORKING ON IT ???? -- //
    searchAPI(querySearch)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/test', isAuthorized, (req, res) => {
    res.status(200).json({ msg: "Successful"} );
});


module.exports = router;





