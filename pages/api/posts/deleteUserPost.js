// next-js-blog-platform/pages/api/posts/deleteUserPost.js
import express from 'express';
import Post from '../../../../models/Post.model';

const router = express.Router();

router.delete('/user-posts/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id)
    .then((userPost) => {
      if (userPost) {
        res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch((err) => {
      next(err);
    });
});

export default router;
