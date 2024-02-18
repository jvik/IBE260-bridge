import BidLog from "../bids/bidLog.js";
import Deck from "../cards/deck.js";
import Player, {
  Direction,
  North,
  South,
  West,
  East,
} from "../players/player.js";
import ruleSet from "../rules/ruleSet.js";

class Table {
  private static instance: Table;
  players: Player[] = [];
  tableRules: ruleSet;

  constructor() {
    this.players = [];
    this.tableRules = ruleSet.getInstance();
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
    const existingPlayer = this.getPlayerByName(player.getPlayerName());
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

  // This is a function that selects a player's partner
  selectOppositePlayer(direction: Direction): Player | undefined {
    const oppositeDirection = (direction + 2) % 4;
    //console.log(oppositeDirection)
    return this.getPlayerByDirection(oppositeDirection);
  }
  // Test function: Returns true if all match - array of "wrongdoers" otherwise
  testAllPlayerPairs(allPlayers: Player[]): boolean | string[] {
    interface Checks {
      North_South: boolean;
      South_North: boolean;
      East_West: boolean;
      West_East: boolean;
    }
    const directionChecks: Checks = {
      North_South:
        this.selectOppositePlayer(allPlayers[0].getDirection()) ===
        allPlayers[2],
      South_North:
        this.selectOppositePlayer(allPlayers[1].getDirection()) ===
        allPlayers[3],
      East_West:
        this.selectOppositePlayer(allPlayers[2].getDirection()) ===
        allPlayers[0],
      West_East:
        this.selectOppositePlayer(allPlayers[3].getDirection()) ===
        allPlayers[1],
    };
    const mismatches: string[] = [];
    for (const key of Object.keys(directionChecks) as Array<keyof Checks>) {
      if (!directionChecks[key]) {
        mismatches.push(key);
      }
    }

    const a = Object.values(directionChecks).every((value) => value === true);
    return mismatches.length > 0 ? mismatches : a;
  }

  // Helper function to get the next player to bid from the direction of the table
  getNextPlayerToBid(): Player {
    const ourBidLog = BidLog.getInstance();
    const lastBid = ourBidLog.getLastBid();
    const ourTable = Table.getInstance();
    const lastBidder = ourTable.getPlayerByName(lastBid.playerName);
    const nextDirection = lastBidder.getNextDirection();
    const nextPlayer = ourTable.getPlayerByDirection(nextDirection);
    return nextPlayer;
  }

  populate() {
    this.addPlayer(new Player("Player 1", North));
    this.addPlayer(new Player("Player 2", South));
    this.addPlayer(new Player("Player 3", East));
    this.addPlayer(new Player("Player 4", West));
    console.info(this.testAllPlayerPairs(this.players));
  }
}

export default Table;
