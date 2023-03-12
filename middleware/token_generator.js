const jwt = require('jsonwebtoken');

const signAccessToken = (userId, userRole) => {
    return new Promise((resolve, reject) => {
        const payload = {
            user_info: {
                id: userId,
                role: userRole,
            },
        };
        const secret = process.env.JWT_MAGIC;
        const options = {
            expiresIn: '15s',
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                reject(err);
            }
            resolve(token);
        });
    });
};

const signRefreshToken = (userId, userRole) => {
    return new Promise((resolve, reject) => {
        const payload = {
            user_info: {
                id: userId,
                role: userRole,
            },
        };
        const secret = process.env.JWT_MAGIC_REFRESH;
        const options = {
            expiresIn: '180d',
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                reject(err);
            }
            resolve(token);
        });
    });
};

module.exports = {
    signAccessToken,
    signRefreshToken,
};
