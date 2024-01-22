import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

interface Player {
  name: string;
}

// This will be a temporary store for the players
const players: { [direction in 'North' | 'South' | 'East' | 'West']?: Player } = {};

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (_req, res) => {
  res.send(players);
});

// Return all available players
app.get('/players', (_req, res) => {
  res.send(players);
});


// Register a player
app.post('/register', (req, res) => {
  const { name, direction } = req.body;
  // Handle the bid logic here
  players[direction] = { name, direction };
  console.log(players);
  res.json(players[direction]);
});

// Prepopulate the players for testing
app.post('/prepopulate', (_req, res) => {
  players['North'] = { name: 'Lars' };
  players['South'] = { name: 'Mons' };
  players['East'] = { name: 'Anders' };
  players['West'] = { name: 'Karl' };
  console.log(players);
  res.json(players);
});


// Bid
app.post('/bid', (req, res) => {
  const { player, bid } = req.body;
  // Handle the bid logic here
  console.log(req.body);
  res.json({ player, bid });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
