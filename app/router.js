var router = require('express').Router();
var getSongs = require('./getSongs');
var q = require('q');

router.get('/', function(req, res) {

    var fooFightersSongs = getSongs('Foo+Fighters');
    var metallicaSongs = getSongs('Metallica');

    q.all([
        fooFightersSongs,
        metallicaSongs
    ]).then(function(responses) {
        return responses.reduce(function(allSongs, songs) {
            return allSongs.concat(songs.slice(0, 2));
        }, []);
    }).done(function(songs) {
        console.log(req.user);
        res.render('index', {
            greeting: 'Hello ' + (req.user ? req.user.username : 'anon'),
            songs: songs,
            requestCount: req.session.requestCount
        });
    });
});

router.get('/songs/:q', function(req, res) {
    getSongs(req.params.q).done(function(songs) {
        res.json(songs);
    });
});

module.exports = router;