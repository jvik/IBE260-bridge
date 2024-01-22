class Player {
  name: string;
  direction: "North" | "South" | "East" | "West";

  constructor(name, direction) {
    this.name = name;
    this.direction = direction;
  }

  // This is a helper function to get the player's name
  getPlayer(): string {
    return this.name;
  }
}

export default Player;
