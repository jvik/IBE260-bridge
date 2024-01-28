type Direction = "North" | "South" | "East" | "West";

class Player {
  name: string;
  direction: Direction;

  constructor(name: string, direction: Direction) {
    this.name = name;
    this.direction = direction;
  }

  // This is a helper function to get the player's name
  getPlayer(): string {
    return this.name;
  }
}

export default Player;
