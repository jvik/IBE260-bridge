import Table from "@/table/table.js";

class Bid {
  suit: "spades" | "hearts" | "diamonds" | "clubs" | "no-trump";
  // Using number because that will make it easier to compare
  pass: boolean;
  rank: number;
  playerName: string;

  constructor(suit: "spades" | "hearts" | "diamonds" | "clubs" | "no-trump",
    pass: boolean, rank: number, playerName: string) {
    if (typeof pass !== 'boolean') {
      throw new Error('Invalid value for pass');
    }
    if (!['spades', 'hearts', 'diamonds', 'clubs', 'no-trump'].includes(suit)) {
      throw new Error(`${suit} is an invalid suit`);
    }
    if (typeof rank !== 'number' || rank <= 2 || rank >= 14) {
      throw new Error('Invalid rank');
    }

    const ourTable = Table.getInstance();
    const myPlayer = ourTable.findByName(playerName);
    if (!myPlayer) {
      throw new Error('Player not found');
    }

    this.pass = pass;
    this.suit = suit;
    this.rank = rank;
    this.playerName = playerName;
  }

  getSuitValue(): number {
    switch (this.suit) {
      case 'clubs':
        return 1;
      case 'diamonds':
        return 2;
      case "hearts":
        return 3;
      case "spades":
        return 4;
      case "no-trump":
        return 5;
    }
  }
}

export default Bid;
