import Post from '../../../../models/Post.model';
import Comment from '../../../../models/Comment.model';

async function handler(req, res, next) {
  if (!req.payload || !req.payload._id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const commentData = {
      post: postId,
      author: req.payload._id,
      text: req.body.text,
    };

    const comment = await Comment.create(commentData);
    const populatedComment = await Comment.populate(comment, { path: 'author' });

    res.status(200).json(populatedComment);
  } catch (err) {
    next(err);
  }
}

export default handler;
