import Player from "../players/players.js";

class Table {
  private static instance: Table;
  players: Player[] = [];

  constructor() {
    this.players = [];
  }

  static getInstance(): Table {
    if (!Table.instance) {
      Table.instance = new Table();
    }
    return Table.instance;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getPlayers() {
    return this.players;
  }
}

export default Table;
