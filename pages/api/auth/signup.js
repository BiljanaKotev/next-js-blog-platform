import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/User.model';
import { isAuthenticated } from '../../../middleware/jwt.middleware';

const avatar = 'https://i.postimg.cc/zGYtKmMM/avatar.png';
const saltRounds = 10;

async function handler(req, res, next) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    // ... rest of the signup route logic
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
