import express from 'express';
import Bid from '@/bids/bid.js';
import BidLog from '@/bids/bidLog.js';
import Table from '@/table/table.js';
import Rules from '@/rules/rules.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const bidLog = BidLog.getInstance();
  res.json(bidLog.getBidLog());
});

router.post('/bid', (req, res) => {
  const { bid, pass, playerName } = req.body;
  const bidLog = BidLog.getInstance();
  let roundOver = bidLog.isBiddingOver();

  const ourTable = Table.getInstance();
  if (ourTable.getPlayers().length < 4) {
    throw new Error('The table is not full');
  }
  if (roundOver) {
    throw new Error("Round is over");
  }
  let rule = bid?.rule; // quick check to look for existing rule
  // if explainerName exists, and bid lacking explanation:
  if (bidLog.explainerName !== undefined && rule === undefined) {
    throw new Error(`Meaning of the bid must be specified by ${bidLog.explainerName}!`)
  }
  let ourBid = undefined;
  if (bidLog.explainerName === undefined) {
    if ((bid?.suit && bid?.rank) || pass) {
      ourBid = new Bid(playerName, bid?.suit, bid?.rank, pass);
      bidLog.addBid(ourBid);

      // TODO: REMOVE COMMENTS
      // If the bid is not known, invoke partner explanation target for next round?
      if (!pass && !bidLog.isBidMeaningKnown(ourBid)) {
        // Here the logic for setting a player should be implemented.
        bidLog.explainerName = "Player 3" // for testing only
      }
    }
  } else { // clear explainerName if it is valid and explains?
    const currPlayers = ourTable.getPlayers()
    const playerNames: string[] = currPlayers.map(player => player.name)
    // "failproofing"
    if (bidLog.explainerName == playerName && rule) {
      let ourRule = new Rules(bid.suit, bid.rank, rule)
      ourTable.tableRules.addRule(ourRule);
      bidLog.explainerName = undefined;
    }
  }
  console.log(ourTable.getRules())
  console.log(bidLog)
  res.json({ ourBid});
});

export default router;
