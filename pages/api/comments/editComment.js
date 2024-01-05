import Comment from '../../../../models/Comment.model';

async function handler(req, res, next) {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (err) {
    next(err);
  }
}

export default handler;
