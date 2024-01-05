// next-js-blog-platform/pages/api/posts/createPost.js
import express from 'express';
import Post from '../../../../models/Post.model';

const router = express.Router();

router.post('/create-post', (req, res, next) => {
  const { coverImg, title, location, content, author } = req.body;

  Post.create({ coverImg, title, location, content, author })
    .then((newPost) => {
      res.status(200).json(newPost);
    })
    .catch((err) => {
      console.error('Error:', err);
      next(err);
    });
});

export default router;
