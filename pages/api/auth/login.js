import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../blog-platform-server/models/User.model';
import { isAuthenticated } from '../../../middleware/jwt.middleware';

async function handler(req, res, next) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // ... rest of the login route logic
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;
