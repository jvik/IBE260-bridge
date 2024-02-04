import Table from "@/table/table.js";

class Bid {
  playerName: string;
  bidSuit: "spades" | "hearts" | "diamonds" | "clubs" | "no-trump";
  bidRank: number;
  pass: boolean;

  constructor(playerName: string, bidSuit: "spades" | "hearts" | "diamonds" | "clubs" | "no-trump",
    bidRank: number, pass?: boolean) {
    if (typeof pass !== 'boolean') {
      pass = false
    }

    const ourTable = Table.getInstance();
    const myPlayer = ourTable.getPlayerByName(playerName);
    if (!myPlayer) {
      throw new Error('Player not found');
    }

    this.pass = pass;
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
