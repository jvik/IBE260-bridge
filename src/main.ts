import express from 'express';
import bodyParser from 'body-parser';
import { createPlayer, players } from './playerService.js';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (_req, res) => {
  res.send('Welcome to the Contract Bridge API!');
});

app.post('/bid', (req, res) => {
  const { player, bid } = req.body;
  // Handle the bid logic here
  res.json({ player, bid });
});

app.post('/register', (req, res) => {
  const { direction, name } = req.body;
  const player = createPlayer(direction, name);
  res.json(player);
  console.log(players);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
