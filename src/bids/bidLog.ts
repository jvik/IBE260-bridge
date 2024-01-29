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
    console.log(bid);
    // Check if the bid is valid
    if (this.bidLog.length > 0 && !this.isNewBidLargerThanLastBid(bid)) {
      throw new Error("This bid is too low");
    }
    this.bidLog.push(bid);
  }

  // This function returns the full bid log
  getBidLog(): Bid[] {
    return this.bidLog;
  }

  // This function returns the last bid in the bid log
  getLastBid(): Bid {
    return this.bidLog[this.bidLog.length - 1];
  }

  // This function compares the bid to the last bid in the bid log
  isNewBidLargerThanLastBid(bid: Bid): boolean {
    const lastBid = this.getLastBid();
    const suitCheck = bid.getSuitValue() < lastBid.getSuitValue();
    const rankCheck = bid.rank <= lastBid.rank;

    if (suitCheck) {
      console.log("Suit too low");
      throw new Error("Suit is too low");
    }
    if (rankCheck && !suitCheck) {
      console.log("Bid too low");
      throw new Error("This bid is too low");
    }
    return true;
  }

  // This helper function checks if the bidding is over
  isBiddingOver(): boolean {
    if (this.bidLog.length < 3) return false;
    const lastThreeBids = this.bidLog.slice(-3);
    const lastThreeBidsArePass = lastThreeBids.every(
      (bid) => bid.pass === true
    );
    return lastThreeBidsArePass;
  }
}

export default BidLog;
