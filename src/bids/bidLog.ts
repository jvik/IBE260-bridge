import Bid from "@/bids/bid.js";
import Table from "@/table/table.js";

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

  addBid(bid: Bid) {
    // Check that we're going the right way around the table
    const ourTable = Table.getInstance();
    const players = ourTable.getPlayers();
    // Check if the bid is in turn
    const lastBid = this.getLastBid() ?? undefined;
    if (lastBid) {
      const lastBidder = players.find(player => player.getName() === lastBid.playerName);
      const currentBidder = players.find(player => player.getName() === bid.playerName);
      if (lastBidder && currentBidder) {
        const lastBidderIndex = players.indexOf(lastBidder);
        const currentBidderIndex = players.indexOf(currentBidder);
        console.log(currentBidderIndex)
        if (lastBidderIndex === currentBidderIndex) {
          throw new Error("You can't bid out of turn");
        }
        if ((lastBidderIndex + 1) % players.length !== currentBidderIndex) {
          throw new Error("You can't bid out of turn");
        }
      }
    }

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
    const suitCheck = bid.card?.getSuitValue() < lastBid.card?.getSuitValue();
    const rankCheck = bid.card?.rank <= lastBid.card?.rank;

    if (suitCheck) {
      console.log("Suit too low");
      throw new Error("Suit is too low");
    }
    if (rankCheck && !suitCheck) {
      console.log("Bid too low");
      throw new Error(`Bid is too low. Last bid was ${lastBid.card?.toString()}`);
    }
    return true;
  }

  isBidMeaningKnown(bid: Bid): boolean {
    if (bid.card.getRankValue() < 3) return true
    const ourTable = Table.getInstance();
    const tableRules = ourTable.getRules();
    return tableRules.ruleSet.some(rule => rule.card.getSuitValue() === bid.card.getSuitValue() && rule.card.getRankValue() === bid.card.getRankValue());
  }

  // TODO: This logic is broken. Need to make something better
  isBiddingOver(): boolean {
    // if (this.bidLog.length < 3) return false;
    // const lastThreeBids = this.bidLog.slice(-3);
    // const lastThreeBidsArePass = lastThreeBids.every(
    //   (bid) => bid.pass === true
    // );
    // return lastThreeBidsArePass;
    return false
  }
}

export default BidLog;
