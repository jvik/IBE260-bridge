import express from 'express';
import bodyParser from 'body-parser';
import playersRouter from '@/players/playersRouter.js';
import bidRouter from '@/bids/bidsRouter.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.use('/players', playersRouter);
app.use('/bids', bidRouter);

// Routes
app.get('/', (_req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
