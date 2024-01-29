import Player from "@/players/player.js";

class Table {
  private static instance: Table;
  players: Player[] = [];

  constructor() {
    this.players = [];
  }

  // Since we only want one instance of Table, we use a singleton pattern
  static getInstance(): Table {
    if (!Table.instance) {
      Table.instance = new Table();
    }
    return Table.instance;
  }

  // This is a helper function to add a player to the table
  addPlayer(player) {
    // Check if a player with the same name already exists
    const existingPlayer = this.findByName(player.name);
    if (existingPlayer) {
      throw new Error(`Player already exists with the name ${player.name}}`);
    }

    // Check if a player with the same direction already exists
    const existingPlayerDirection = this.findByDirection(player.direction);
    if (existingPlayerDirection) {
      throw new Error("The table already has a player in that direction");
    }

    this.players.push(player);
  }

  // This is a helper function to get all players
  getPlayers() {
    return this.players;
  }

  // This is a helper function to find a player by their direction
  findByDirection(direction) {
    return this.players.find((player) => player.direction === direction);
  }

  // This is a helper function to find a player by their name
  findByName(name) {
    return this.players.find((player) => player.name === name);
  }

  populate() {
    this.addPlayer(new Player("Player 1", "North"));
    this.addPlayer(new Player("Player 2", "South"));
    this.addPlayer(new Player("Player 3", "East"));
    this.addPlayer(new Player("Player 4", "West"));
  }
}

export default Table;
