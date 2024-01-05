import Comment from '../../../../models/Comment.model';

async function handler(req, res, next) {
  const { postId, commentId } = req.params;

  try {
    const comment = await Comment.findOne({ _id: commentId, post: postId }).populate('author');

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
}

export default handler;
