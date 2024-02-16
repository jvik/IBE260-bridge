import Card from "@/cards/card.js";

export type Direction = "North" | "South" | "East" | "West";

class Player {
  name: string;
  direction: Direction;
  cards: Card[] = [];

  constructor(name: string, direction: Direction) {
    this.name = name;
    this.direction = direction;
  }

  // This is a helper function to get the player's name
  getPlayerName(): string {
    return this.name;
  }

  getDirection(): Direction {
    return this.direction;
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }
}

export default Player;
