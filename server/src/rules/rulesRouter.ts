import express from "express";
import BidLog from "../bids/bidLog.js";
import Table from "../table/table.js";
import Rule from "./rule.js";

const router = express.Router();

router.get("/", (_req, res) => {
  const ourTable = Table.getInstance();
  res.send(ourTable.getRules());
});

router.post("/", (req, res) => {
  const { ruleText } = req.body;
  const bidLog = BidLog.getInstance();
  const ourTable = Table.getInstance();

  if (bidLog.explainerName === undefined) {
    throw new Error("No explanation is expected at this time");
  }

  if (ruleText === undefined) {
    throw new Error("Rule text is required");
  }

  const lastBid = bidLog.getLastNonBidPass();
  const playerNameOnLastBid = ourTable.getPlayerByName(lastBid.playerName);
  const directionOfPlayer = playerNameOnLastBid.getDirection();
  const partnerOfCurrentPlayer =
    ourTable.selectOppositePlayer(directionOfPlayer);

  if (bidLog.explainerName !== partnerOfCurrentPlayer?.getPlayerName()) {
    throw new Error(
      `Only ${partnerOfCurrentPlayer?.getPlayerName()} can explain the rule.`,
    );
  }

  const newRule = new Rule(
    lastBid.bidSuit,
    lastBid.bidRank,
    ruleText,
    bidLog.explainerName,
  );
  ourTable.tableRules.addRule(newRule);
  res.send(newRule);
});

export default router;
