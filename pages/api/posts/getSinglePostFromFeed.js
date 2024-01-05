// next-js-blog-platform/pages/api/posts/getSinglePostFromFeed.js
import express from 'express';
import Post from '../../../../models/Post.model';

const router = express.Router();

router.get('/blog-feed/:id', (req, res, next) => {
  const postId = req.params.id;

  Post.findById(postId)
    .populate('author')
    .then((postFromDB) => {
      if (postFromDB) {
        res.status(200).json(postFromDB);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch((err) => {
      next(err);
    });
});

export default router;
