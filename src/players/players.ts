interface Player {
  name: string;
}

class Player {
  name: string;
  direction: "North" | "South" | "East" | "West";

  constructor(name, direction) {
    this.name = name;
    this.direction = direction;
  }

  getPlayer(): string {
    return this.name;
  }
}

export default Player;
