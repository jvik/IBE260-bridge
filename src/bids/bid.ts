import Card from "@/cards/card.js";
import Table from "@/table/table.js";

class Bid {
  playerName: string;
  card?: Card;
  pass: boolean;
  notrump: boolean;

  constructor(playerName: string, card?: Card, pass?: boolean, notrump?: boolean) {
    if (typeof pass !== 'boolean') {
      pass = false
    }
    if (typeof notrump !== 'boolean') {
      notrump = false;
    }
    if (notrump && card) {
      throw new Error('Cannot have a card and no trump');
    }

    const ourTable = Table.getInstance();
    const myPlayer = ourTable.getPlayerByName(playerName);
    if (!myPlayer) {
      throw new Error('Player not found');
    }

    this.notrump = notrump;
    this.pass = pass;
    this.card = card;
    this.playerName = playerName;
  }
}

export default Bid;
