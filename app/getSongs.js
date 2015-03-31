var q = require('q');
var request = q.denodeify(require('request'));

var convertToSongs = function(tracks) {
    return tracks.map(function(track) {
        return {
            author: track.user.username,
            title: track.title
        }
    });
};

module.exports = function(q) {
    return request('http://xplatform.org/ext/soundcloud/tracks.json?q=' + q)
        .then(function(response) {
            return response[1];
        })
        .then(JSON.parse)
        .then(convertToSongs);
};