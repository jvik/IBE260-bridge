import Player from "../players/player.js";

class Bid {
  suit: "spades" | "hearts" | "diamonds" | "clubs" | "no-trump" | "pass";
  // Using number because that will make it easier to compare
  level: number;
  player: Player;

  constructor(suit, level) {
    this.suit = suit;
    this.level = level;
  }
}

export default Bid;
