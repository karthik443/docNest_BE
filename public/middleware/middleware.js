import jwt from 'jsonwebtoken';
import config from '../config.json' assert {type:'json'}
const JWT_SECRET = config.JWT_SECRET_KEY; 

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided, access denied' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    // If valid, store user data in request for later use
    req.user = decoded.user; // decoded will contain { userId: '...' }
    next();
  });
};

export default authMiddleware;
