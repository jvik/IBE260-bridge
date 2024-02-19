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
    // If bids rank and suit value are both 0, that means we have a pass
    if (
      bid.bidSuit !== undefined &&
      bid.bidRank !== undefined &&
      this.bidLog.length > 0 &&
      !this.isNewBidLargerThanLastBid(bid)
    ) {
      throw new Error("This bid is too low");
    }

    this.bidLog.push(bid);
  }

  // This function returns the full bid log
  getBidLog(): Bid[] {
    return this.bidLog;
  }

  // This function returns the last bid in the bid log
  getLastNonBidPass(): Bid {
    for (let i = this.bidLog.length - 1; i >= 0; i--) {
      const bid = this.bidLog[i];
      if (bid.bidSuit !== undefined && bid.bidRank !== undefined) {
        return bid;
      }
    }
    // If no non-pass bid is found
    return this.bidLog[this.bidLog.length - 1]; // this is probably bad :s
  }

  getLastBid() {
    return this.bidLog[this.bidLog.length - 1];
  }

  // This function compares the bid to the last bid in the bid log
  isNewBidLargerThanLastBid(bid: Bid): boolean {
    const lastBid = this.getLastNonBidPass();
    const suitCheck =
      (bid.getBidSuitValue() ?? 0) < (lastBid.getBidSuitValue() ?? 0);
    const rankCheck = (bid.bidRank ?? 0) < (lastBid.bidRank ?? 0);
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
        rule.ruleText &&
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
