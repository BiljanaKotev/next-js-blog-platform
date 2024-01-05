import Comment from '../../../../models/Comment.model';

async function handler(req, res, next) {
  const { commentId } = req.params;

  try {
    const userComment = await Comment.findByIdAndDelete(commentId);

    if (userComment) {
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    next(err);
  }
}

export default handler;
