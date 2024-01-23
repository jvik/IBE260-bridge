import express from 'express';
import Player from '@/players/player.js';
import Table from '@/table/table.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const ourTable = Table.getInstance();
  res.send(ourTable.getPlayers());
});

router.post('/register', (req, res) => {
  const { name, direction } = req.body;

  const ourTable = Table.getInstance();

  const ourPlayer = new Player(name, direction);
  ourTable.addPlayer(ourPlayer);

  console.log("Player added to table");
  res.json(ourPlayer);
});

router.post('/prepopulate', (_req, res) => {
  const ourTable = Table.getInstance();
  const player1 = new Player("Player 1", "North");
  const player3 = new Player("Player 2", "South");
  const player2 = new Player("Player 3", "East");
  const player4 = new Player("Player 4", "West");

  ourTable.addPlayer(player1);
  ourTable.addPlayer(player2);
  ourTable.addPlayer(player3);
  ourTable.addPlayer(player4);
  res.json(ourTable.getPlayers());
});

export default router;
