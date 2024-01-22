import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { player, bid } = req.body;
  console.log(req.body);
  res.json({ player, bid });
});

export default router;
