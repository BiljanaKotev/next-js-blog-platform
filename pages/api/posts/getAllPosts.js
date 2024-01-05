// next-js-blog-platform/pages/api/posts/getAllPosts.js
import express from 'express';
import Post from '../../../../models/Post.model';

const router = express.Router();

router.get('/blog-feed', (req, res, next) => {
  Post.find()
    .populate('author')
    .then((postsFromDB) => {
      postsFromDB.forEach((post) => {
        if (!post.author) {
          console.log('Missing author for post with _id:', post._id);
        }
      });

      res.status(200).json(postsFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

export default router;
