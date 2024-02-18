import express from "express";
import Bid from "../bids/bid.js";
import BidLog from "../bids/bidLog.js";
import Table from "../table/table.js";

const router = express.Router();

router.get("/", (_req, res) => {
  const bidLog = BidLog.getInstance();
  res.json(bidLog.getBidLog());
});

router.post("/bid", (req, res) => {
  const { bid, pass, playerName } = req.body;
  const bidLog = BidLog.getInstance();
  const ourTable = Table.getInstance();

  if (ourTable.getPlayers().length < 4) {
    throw new Error("The table is not full");
  }

  if (bidLog.isBiddingOver()) {
    throw new Error("Round is over");
  }

  const suitAndRankExists = bid?.suit && bid?.rank;
  if (!suitAndRankExists && !pass) {
    throw new Error("Bid must have a suit and rank or be a pass");
  }

  if (bidLog.explainerName) {
    throw new Error(
      `Meaning of the bid must be specified by ${bidLog.explainerName}!`,
    );
  }

  if (bidLog.getBidLog().length > 0) {
    const nextPlayer = ourTable.getNextPlayerToBid().getPlayerName();
    if (playerName !== nextPlayer) {
      throw new Error(`It is ${nextPlayer}'s turn to bid`);
    }
  }

  // Create and add the bid to the bid log
  const newBid = new Bid(playerName, bid?.suit, bid?.rank, pass);
  bidLog.addBid(newBid);

  // If the bid is not known, invoke partner explanation target immediately
  if (!pass && !bidLog.isBidMeaningKnown(newBid)) {
    const currentPlayer = ourTable.getPlayerByName(playerName);
    const directionOfPlayer = currentPlayer.getDirection();
    const partnerOfCurrentPlayer =
      ourTable.selectOppositePlayer(directionOfPlayer);
    if (partnerOfCurrentPlayer) {
      bidLog.explainerName = partnerOfCurrentPlayer.getPlayerName();
    }
  }

  res.json({ newBid });
});

export default router;
