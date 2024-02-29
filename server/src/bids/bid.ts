import Table from "../table/table.js";

export type CardSuit = "spades" | "hearts" | "diamonds" | "clubs" | "no-trump";
export type CardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7;

class Bid {
  playerName: string;
  bidSuit: CardSuit;
  bidRank: CardRank;
  pass: boolean;

  constructor(
    playerName: string,
    bidSuit: CardSuit,
    bidRank: CardRank,
    pass?: boolean,
  ) {
    // If pass is not defined or malformed, it is false
    let shouldWePass = pass;
    if (typeof pass !== "boolean") {
      shouldWePass = false;
    } else {
      shouldWePass = pass;
    }

    // Deny bids larger than 7
    if (bidRank > 7) {
      throw new Error("Bid rank cannot be larger than 7");
    }

    const ourTable = Table.getInstance();
    const myPlayer = ourTable.getPlayerByName(playerName);
    if (!myPlayer) {
      throw new Error("Player not found");
    }

    this.pass = shouldWePass;
    this.bidSuit = bidSuit;
    this.bidRank = bidRank;
    this.playerName = playerName;
  }

  getBidSuitValue(): number {
    switch (this.bidSuit) {
      case "clubs":
        return 1;
      case "diamonds":
        return 2;
      case "hearts":
        return 3;
      case "spades":
        return 4;
      case "no-trump":
        return 5;
      default:
        return 0; // Default value for unexpected cases
    }
  }
}

export default Bid;
