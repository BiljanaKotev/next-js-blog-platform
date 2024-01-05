// next-js-blog-platform/pages/api/posts/getUserPosts.js
import express from 'express';
import Post from '../../../../models/Post.model';

const router = express.Router();

router.get('/user-posts', isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  Post.find({ author: userId })
    .populate('author')
    .then((userPosts) => {
      if (userPosts) {
        res.status(200).json(userPosts);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch((err) => {
      next(err);
    });
});

export default router;
