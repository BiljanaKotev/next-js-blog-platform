import Comment from '../../../../models/Comment.model';

async function handler(req, res, next) {
  const postId = req.params.id;

  try {
    const comments = await Comment.find({ post: postId }).populate('author');

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
}

export default handler;
