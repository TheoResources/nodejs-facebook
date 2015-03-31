module.exports = function(req, res, next) {
    var startTime = Date.now();

    res.on('finish', function() {
        var endTime = Date.now();
        console.log('[' + req.url + '] Response time: ' + (endTime - startTime));
    });

    next();

    var endTime = Date.now();
    console.log('[' + req.url + '] Response time sync: ' + (endTime - startTime));
};