const router = require('express').Router();
const searchAPI = require('../utils/API');
const {isAuthorized} = require('../utils/auth');


// router.get('/', (req, res) => {
//     console.log(req);
//     console.log(`User: ${req.user}`);

//     res.status(200).json({ msg: "Hit /api Route"})
// })

router.get('/:query', (req, res) => {
    console.log('ParamS: ', req.params);
    console.log(`User: ${req.user}`);

    searchAPI(req.params.query)
        .then(response => {
            // console.log(response.data);
            res.status(200).json(response.data);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: "Error making request"})
        });
})

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





