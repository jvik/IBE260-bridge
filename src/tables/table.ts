import Player from "../player/player.js";

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
}

export default Table;
