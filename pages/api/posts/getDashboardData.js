// next-js-blog-platform/pages/api/posts/getDashboardData.js
import express from 'express';
import Post from '../../../../models/Post.model';
import { isAuthenticated } from '../../../../middleware/jwt.middleware';

const router = express.Router();

router.get('/dashboard', isAuthenticated, (req, res, next) => {
  Post.find({ author: req.payload._id })
    .then((dashboard) => {
      res.json(dashboard);
    })
    .catch((err) => {
      next(err);
    });
});

export default router;
