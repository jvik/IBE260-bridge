import express from "express";
import Deck from "./deck.js";

const router = express.Router();

// Only for debugging purposes to check if cards are dealt to players
// If cards are dealt correctly, this should not be needed
router.get("/", (_req, res) => {
  res.send(Deck.getInstance());
});

export default router;
