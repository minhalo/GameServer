import rateLimit from 'express-rate-limit'

exports.authLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 2,
    handler: function (req, res) {
        res.status(429).send({
            errCode: 1,
            errMessage: 'Too many requests!',
        });
    },
});


exports.userLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 30,
    handler: function (req, res) {
        res.status(429).send({
            errCode: 1,
            errMessage: 'Too many requests!',
        });
    },
});

