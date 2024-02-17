import express from "express";
import Bid from "../bids/bid.js";
import BidLog from "../bids/bidLog.js";
import Rules from "../rules/rules.js";
import Table from "../table/table.js";

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
        let toSelectPartnerOf = ourTable.getPlayerByName(playerName)
        let dir = toSelectPartnerOf.getDirection()
        let playerToSelect = ourTable.selectOppositePlayer(dir)
        if (playerToSelect) {
          bidLog.explainerName = playerToSelect.getPlayerName()
        }
        //bidLog.explainerName = ourTable.selectOppositePlayer()
        //bidLog.explainerName = "Player 3"; // for testing only
      }
    }
  } else {
    // If bid suit and rank are defined, name matches & has a rule:
    if (suitAndRankExists && bidLog.explainerName === playerName && rule) {
      const ourRule = new Rules(bid.suit, bid.rank, rule); // new rule
      if (ourTable.tableRules.ruleAlreadyExists(ourRule)) {
        throw new Error(`Rule already exists for this table.`)
      }
      // if rule explanation doesnt match our previous bid, error.
      let lastBid = bidLog.getLastBid()
      if (lastBid.bidSuit != ourRule.ruleSuit || lastBid.bidRank != ourRule.ruleRank) {
        throw new Error(`Rule for ${lastBid.bidRank} of ${lastBid.bidSuit} was expected.`)
      }
      ourTable.tableRules.addRule(ourRule); // add rule
      bidLog.explainerName = undefined; // reset explainer
    }
  }
  console.log(bidLog);
  res.json({ ourBid });
});

export default router;
