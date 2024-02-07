require("dotenv").config();
const axios = require("axios");
const KEY = process.env.API_KEY;

function search(query) {
    let queryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${KEY}&maxResults=25`;
    return axios.get(queryURL);
}

function queryNext(nextPage) {
    let nextPageQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${KEY}&maxResults=25&pageToken=${nextPage}`;
    console.log();
    return axios.get(nextPageQuery)
}

module.exports = search;
