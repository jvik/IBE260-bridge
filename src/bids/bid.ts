import Card from "@/cards/card.js";
import Table from "@/table/table.js";

class Bid {
  playerName: string;
  card?: Card;
  pass: boolean;

  constructor(playerName: string, card?: Card, pass?: boolean) {
    if (typeof pass !== 'boolean') {
      pass = false
    }

    const ourTable = Table.getInstance();
    const myPlayer = ourTable.getPlayerByName(playerName);
    if (!myPlayer) {
      throw new Error('Player not found');
    }

    this.pass = pass;
    this.card = card;
    this.playerName = playerName;
  }
}

export default Bid;
