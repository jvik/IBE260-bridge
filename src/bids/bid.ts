import Player from "@/players/player.js";

class Bid {
  pass: boolean;
  suit: "spades" | "hearts" | "diamonds" | "clubs" | "no-trump";
  // Using number because that will make it easier to compare
  level: number;
  player: Player;

  constructor(pass, suit, level) {
    this.pass = pass;
    this.suit = suit;
    this.level = level;
  }
}

export default Bid;
