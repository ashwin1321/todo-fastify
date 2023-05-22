const jwt = require('jsonwebtoken');
const fastifyPlugin = require('fastify-plugin');

const validateUserLogin = async (request, reply, done) => {
    try {
        const token = request.headers['access-token'] || request.headers.authorization; // Get the token from the header

        if (!token) {
            reply.code(401).send('Unauthorized');
            return;
        }

        const validAccessToken = jwt.verify(token, 'mySecretKey'); // Verify the access token

        if (validAccessToken) {
            done();
            return;
        }
    } catch (accessTokenError) {
        try {
            const refreshToken = request.headers['refresh-token']; // Get the refresh token from the header

            if (!refreshToken) {
                reply.code(401).send('Unauthorized');
                return;
            }

            const validRefreshToken = jwt.verify(refreshToken, 'refreshSecretKey'); // Verify the refresh token

            if (validRefreshToken) {
                // Generate new access token
                const newAccessToken = jwt.sign({ id: validRefreshToken.id }, 'mySecretKey', { expiresIn: '5s' });
                console.log('new access token', newAccessToken);

                // Attach the new access token to the reply headers
                reply.header('Authorization', newAccessToken);

                done();
                return;
            }
        } catch (refreshTokenError) {
            console.error('Error validating user', refreshTokenError);
        }
    }

    reply.code(401).send('Unauthorized');
};

const validateUser = fastifyPlugin(validateUserLogin);
module.exports = validateUser;
