import Bid from "@/bids/bid.js";

class BidLog {
  private static instance: BidLog;
  bidLog: Bid[] = [];

  constructor() {
    this.bidLog = [];
  }

  // Singleton pattern
  static getInstance() {
    if (!BidLog.instance) {
      BidLog.instance = new BidLog();
    }
    return BidLog.instance;
  }

  addBid(bid) {
    // Check if the bid is valid
    if (!this.compareBid(bid)) {
      throw new Error("This bid is too low");
    }
    this.bidLog.push(bid);
  }

  // This function returns the full bid log
  getBidLog() {
    return this.bidLog;
  }

  // This function returns the last bid in the bid log
  getLastBid() {
    return this.bidLog[this.bidLog.length - 1];
  }

  // This function compares the bid to the last bid in the bid log
  compareBid(bid) {
    const lastBid = this.getLastBid();
    if (bid.level < lastBid.level) {
      throw new Error("This bid is too low");
    }
    return true;
  }

  // This helper function checks if the bidding is over
  isBiddingOver() {
    const lastThreeBids = this.bidLog.slice(-3);
    const lastThreeBidsArePass = lastThreeBids.every(
      (bid) => bid.pass === true
    );
    return lastThreeBidsArePass;
  }
}

export default BidLog;
