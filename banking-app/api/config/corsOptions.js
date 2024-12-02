const whitelist = /http:\/\/(127(\.\d){3}|localhost)/;

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.test(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;