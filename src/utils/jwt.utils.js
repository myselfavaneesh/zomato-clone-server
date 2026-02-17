import jsonwebtoken from 'jsonwebtoken';


const generateAccessToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKKEN_EXPIRES_IN });
};

const VerifyToken = (token) => { return jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY); };


export default { generateAccessToken, VerifyToken }