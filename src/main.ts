import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

interface Player {
  number: 1 | 2 | 3 | 4;
  direction: 'North' | 'South' | 'East' | 'West';
  name: string;
}

let players: Player[] = [];

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (_req, res) => {
  res.send(players);
});

app.post('/register', (req, res) => {
  const { player, name, direction } = req.body;
  // Handle the bid logic here
  players[0] = { number: player, name, direction };
  console.log(req.body);
  res.json(players[0]);
});

app.post('/bid', (req, res) => {
  const { player, bid } = req.body;
  // Handle the bid logic here
  console.log(req.body);
  res.json({ player, bid });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
