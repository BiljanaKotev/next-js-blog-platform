// next-js-blog-platform/pages/api/index/getAllData.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

export default router;
