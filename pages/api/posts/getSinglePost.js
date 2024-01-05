// next-js-blog-platform/pages/api/posts/getSinglePost.js
import express from 'express';
import Post from '../../../../models/Post.model';

const router = express.Router();

router.get('/user-posts/:id', isAuthenticated, (req, res, next) => {
  const id = req.params.id;

  Post.findById(id)
    .populate('author')
    .then((dbPost) => {
      if (dbPost) {
        res.status(200).json(dbPost);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch((err) => {
      next(err);
    });
});

export default router;
