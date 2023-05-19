const jwt = require('jsonwebtoken');

const validateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token)     // get the token from the header

        if (!token) {
            return res.status(401).send("Unauthorized");
        }

        const validToken = jwt.verify(token, "mySecretKey");           // verify the token
        if (validToken) {
            next();
        }
    } catch (error) {
        console.error("Error validating user", error);
        res.status(401).send("Unauthorized");
    }

}
module.exports = validateUser;