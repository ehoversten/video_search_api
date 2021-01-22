// require("dotenv").config();
const axios = require("axios");
const KEY = process.env.API_KEY;

// export default {
//     search: function(query) {
//         let queryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${KEY}&maxResults=25`
//         return axios.get(queryURL);
//     }
// }
function search(query) {
    let queryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${KEY}&maxResults=25`
    return axios.get(queryURL);
}
//         .then(data => {
//             return data;
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

module.exports = search;

// export default search;