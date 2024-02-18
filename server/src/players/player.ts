import Card from "../cards/card.js";

// export type Direction = "North" | "South" | "East" | "West"; legacy
export enum Direction {
  North = 0,
  South = 1,
  East = 2,
  West = 3,
}
export const { North, South, East, West } = Direction;

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

  getNextDirection(): Direction {
    return (this.direction + 1) % 4;
  }
}

export default Player;
