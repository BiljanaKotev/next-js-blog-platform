// next-js-blog-platform/pages/api/posts/uploadImage.js
import express from 'express';
import fileUploader from '../../../../config/cloudinary.config';

const router = express.Router();

router.post('/upload', fileUploader.single('imgUrl'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  const responseObject = { fileUrl: req.file.path };
  res.json({ fileUrl: req.file.path });
});

export default router;
