const passport = require('passport');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf8');
const serviceKey = process.env.SERVICE_KEY;
const axios = require('axios');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredRights.length) {
        const userRights = roleRights.get(user.role);
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights && req.params.userId !== user.id) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
        }
    }
    resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

const authenticateService = () => async (req, res, next) => {
    try {
        const apiKey = req.headers["x-api-key"];
        const authToken = req.header('Authorization') || req.query.token;
        const serviceApiKey = req.headers['service-api-key'];

        if (apiKey) {
            try {
            const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/api/org/apikey/validate`, {
                    headers: { "x-api-key": apiKey },
                });
                const { success, org } = response.data.data;

                if (!success) {
                    return res.status(401).json({ error: "Invalid authentication credentials" });
                }

                req.authenticatedService = {
                    orgId: org._id,
                    email: `support+${org.name}@snapsec.co`
                };
                return next();
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Internal server error during API key validation" });
            }
        }

        if (authToken) {
            const token = authToken.split(' ')[1] || authToken;
            const decodedToken = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

            if (decodedToken.licenceExpiry && new Date(decodedToken.licenceExpiry) < new Date()) {
                return res.status(401).json({ error: "Licence has expired" });
            }

            if (decodedToken.orgAccess && !decodedToken.orgAccess.includes("ASM")) {
                return res.status(401).json({ error: "You do not have access to SnapSec ASM" });
            }

            req.authenticatedService = decodedToken;
            return next();
        }

        if (serviceApiKey === serviceKey) {
            return next();
        }

        return res.status(401).json({ message: 'Authentication token is missing' });
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

module.exports = { auth, authenticateService };