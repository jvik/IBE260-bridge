import Bid from "../bids/bid.js";
import Table from "../table/table.js";

class BidLog {
  private static instance: BidLog;
  bidLog: Bid[] = [];
  explainerName: string | undefined;

  constructor() {
    this.bidLog = [];
    this.explainerName = undefined;
  }

  // Singleton pattern
  static getInstance() {
    if (!BidLog.instance) {
      BidLog.instance = new BidLog();
    }
    return BidLog.instance;
  }

  addBid(bid: Bid) {
    // Check that we're going the right way around the table
    const ourTable = Table.getInstance();
    const players = ourTable.getPlayers();
    // Check if the bid is in turn
    const lastBid = this.getLastBid() ?? undefined;
    // Check if the bid is valid

    // If bids rank and suit value are both 0, that means we have a pass
    if (
      bid.bidSuit !== undefined &&
      bid.bidRank !== undefined &&
      this.bidLog.length > 0 &&
      !this.isNewBidLargerThanLastBid(bid)
    ) {
      throw new Error("This bid is too low");
    }
    if (lastBid) {
      const lastBidder = players.find(
        (player) => player.getPlayerName() === lastBid.playerName,
      );
      const currentBidder = players.find(
        (player) => player.getPlayerName() === bid.playerName,
      );
      if (lastBidder && currentBidder) {
        //console.log("Lastbidder: ", lastBidder.getPlayerName())
        //console.log("Currentbidder: ", currentBidder.getPlayerName())
        const lastBidderIndex = players.indexOf(lastBidder);
        const currentBidderIndex = players.indexOf(currentBidder);
        if (lastBidderIndex === currentBidderIndex) {
          throw new Error(
            `You can't bid out of turn, ${lastBidder.getPlayerName()}, it's ${currentBidder.getPlayerName()}'s turn!`,
          );
        }
        // I broke this error, I think.
        if (
          !(lastBid.bidRank && lastBid.bidSuit) &&
          (lastBidderIndex + 1) % players.length !== currentBidderIndex
        ) {
          throw new Error(`You can't bid out of turn, 12345`);
        }
        if ((lastBidderIndex + 1) % players.length !== currentBidderIndex) {
          throw new Error("Bidding out of turn!");
        }
      }
    }

    this.bidLog.push(bid);
  }

  // This function returns the full bid log
  getBidLog(): Bid[] {
    return this.bidLog;
  }

  // This function returns the last bid in the bid log
  getLastBid(): Bid {
    for (let i = this.bidLog.length - 1; i >= 0; i--) {
      const bid = this.bidLog[i];
      if (bid.bidSuit !== undefined && bid.bidRank !== undefined) {
        return bid;
      }
    }
    // If no non-pass bid is found
    return this.bidLog[this.bidLog.length - 1]; // this is probably bad :s
  }

  /* getLastBid(): Bid { // Legacy
    return this.bidLog[this.bidLog.length - 1];
  } */

  // This function compares the bid to the last bid in the bid log
  isNewBidLargerThanLastBid(bid: Bid): boolean {
    const lastBid = this.getLastBid();
    const suitCheck =
      (bid.getBidSuitValue() ?? 0) < (lastBid.getBidSuitValue() ?? 0);
    const rankCheck = (bid.bidRank ?? 0) < (lastBid.bidRank ?? 0);
    //console.log("Current", bid)
    //console.log("Previous", lastBid)
    if (suitCheck) {
      throw new Error(
        `Suit is too low for bid. Last bid was ${lastBid.bidSuit.toString()}`,
      );
    }
    if (rankCheck && !suitCheck) {
      throw new Error(
        `Bid is too low. Last bid was ${lastBid.bidRank.toString()}`,
      );
    }
    if (bid.bidRank === lastBid.bidRank && bid.bidSuit === lastBid.bidSuit) {
      throw new Error(
        `Bid cannot be identical to previous bid. Last bid was also ${lastBid.bidRank.toString()} of ${lastBid.bidSuit.toString()}.`,
      );
    }
    if (
      lastBid.pass !== true &&
      !(bid.bidRank && bid.bidSuit) &&
      bid.pass !== false
    ) {
      return false;
    }
    return true;
  }

  isBidMeaningKnown(bid: Bid): boolean {
    if (bid && bid.bidRank < 3) return true;
    const ourTable = Table.getInstance();
    const tableRules = ourTable.getRules();
    return tableRules.ruleSet.some(
      (rule) =>
        rule.rule &&
        rule.ruleSuit === bid.bidSuit &&
        rule.ruleRank === bid.bidRank,
    );
  }

  isBiddingOver(): boolean {
    if (this.bidLog.length < 4) return false;
    const lastThreeBids = this.bidLog.slice(-3);
    const lastThreeBidsArePass = lastThreeBids.every(
      (bid) => bid.pass === true,
    );
    return lastThreeBidsArePass;
  }
}

export default BidLog;
