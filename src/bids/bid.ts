import Player from "@/players/player.js";

class Bid {
  pass: boolean;
  suit: "spades" | "hearts" | "diamonds" | "clubs" | "no-trump";
  // Using number because that will make it easier to compare
  level: number;
  player: Player;

  constructor(pass, suit, level, player) {
    this.pass = pass;
    this.suit = suit;
    this.level = level;
    this.player = player;
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
