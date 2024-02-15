import Deck from "@/cards/deck.js";
import Player, { Direction } from "@/players/player.js";
import ruleSet from "./ruleSet.js";

class Table {
  private static instance: Table;
  players: Player[] = [];
  tableRules: ruleSet;

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
  addPlayer(player: Player) {
    // Check if a player with the same name already exists
    const existingPlayer = this.getPlayerByName(player.getName());
    if (existingPlayer) {
      throw new Error(`Player already exists with the name ${player.name}}`);
    }

    // Check if a player with the same direction already exists
    const existingPlayerDirection = this.getPlayerByDirection(
      player.getDirection(),
    );
    if (existingPlayerDirection) {
      throw new Error(
        `The table already has a player in the direction ${player.direction}`,
      );
    }

    this.players.push(player);
    const ourDeck = Deck.getInstance();
    const ourTable = Table.getInstance();
    if (this.players.length === 4) {
      for (const player of ourTable.getPlayers()) {
        player.cards = ourDeck.dealHand(13);
      }
    }
  }

  // This is a helper function to get all players
  getPlayers(): Player[] {
    return this.players;
  }

  // This is a helper function to get all rules set for the table
  getRules(): ruleSet {
    return this.tableRules;
  }

  // This is a helper function to find a player by their direction
  getPlayerByDirection(direction: Direction): Player {
    return this.players.find(
      (player) => player.direction === direction,
    ) as Player;
  }

  // This is a helper function to find a player by their name
  getPlayerByName(name: string): Player {
    return this.players.find((player) => player.name === name) as Player;
  }

  populate() {
    this.addPlayer(new Player("Player 1", "North"));
    this.addPlayer(new Player("Player 2", "South"));
    this.addPlayer(new Player("Player 3", "East"));
    this.addPlayer(new Player("Player 4", "West"));
  }
}

export default Table;
