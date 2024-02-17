import express from "express";
import Deck from "./deck.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(Deck.getInstance());
});

export default router;
