import { isAuthenticated } from '../../../middleware/jwt.middleware';

async function handler(req, res, next) {
  if (req.method === 'GET') {
    // ... rest of the verify route logic
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
