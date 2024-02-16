import express from "express";
import Player from "../players/player.js";
import Table from "../table/table.js";

const router = express.Router();

router.get("/", (_req, res) => {
  const ourTable = Table.getInstance();
  res.send(ourTable.getPlayers());
});

router.post("/register", (req, res) => {
  const { name, direction } = req.body;

  const ourTable = Table.getInstance();

  const ourPlayer = new Player(name, direction);
  ourTable.addPlayer(ourPlayer);

  res.json(ourPlayer);
});

export default router;
