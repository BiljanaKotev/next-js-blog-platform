// next-js-blog-platform/pages/api/posts/editUserPost.js
import express from 'express';
import Post from '../../../../models/Post.model';

const router = express.Router();

router.put('/user-posts/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  const { title, content, coverImg } = req.body;

  Post.findByIdAndUpdate(id, { title, content, coverImg }, { new: true })
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((err) => {
      next(err);
    });
});

export default router;
