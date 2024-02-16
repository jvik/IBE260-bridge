import Bid from "../bids/bid.js";
import BidLog from "../bids/bidLog.js";
import Rules from "../rules/rules.js";
import Table from "../table/table.js";
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  const bidLog = BidLog.getInstance();
  res.json(bidLog.getBidLog());
});

router.post("/bid", (req, res) => {
  const { bid, pass, playerName } = req.body;
  const bidLog = BidLog.getInstance();
  const roundOver = bidLog.isBiddingOver();

  const ourTable = Table.getInstance();
  if (ourTable.getPlayers().length < 4) {
    throw new Error("The table is not full");
  }
  if (roundOver) {
    throw new Error("Round is over");
  }
  const rule = bid?.rule; // quick check to look for existing rule
  // if explainerName exists, and bid lacking explanation:
  if (bidLog.explainerName !== undefined && rule === undefined) {
    throw new Error(
      `Meaning of the bid must be specified by ${bidLog.explainerName}!`,
    );
  }
  let ourBid = undefined;
  const suitAndRankExists = bid?.suit && bid?.rank;
  if (bidLog.explainerName === undefined) {
    if (suitAndRankExists || pass) {
      ourBid = new Bid(playerName, bid?.suit, bid?.rank, pass);
      bidLog.addBid(ourBid);

      // TODO: REMOVE COMMENTS
      // If the bid is not known, invoke partner explanation target for next round?
      if (!pass && !bidLog.isBidMeaningKnown(ourBid)) {
        // Here the logic for setting a player should be implemented.
        bidLog.explainerName = "Player 3"; // for testing only
      }
    }
  } else {
    // TODO : 2 lines below may be unnecessary, for review!
    // const currPlayers = ourTable.getPlayers();
    // const playerNames: string[] = currPlayers.map((player) => player.name);
    // If bid suit and rank are defined, name matches & has a rule:
    if (suitAndRankExists && bidLog.explainerName == playerName && rule) {
      const ourRule = new Rules(bid.suit, bid.rank, rule); // new rule
      ourTable.tableRules.addRule(ourRule); // add rule
      bidLog.explainerName = undefined; // reset explainer
    }
  }
  console.log(bidLog);
  res.json({ ourBid });
});

export default router;
