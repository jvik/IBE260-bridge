import Card from "@/cards/card.js";
import { Suit, Rank } from "@/cards/card.js";

class Deck {
  private static instance: Deck;
  private cards: Card[] = [];

  constructor() {
    this.initializeDeck();
    this.shuffle();
  }

  static getInstance() {
    if (!Deck.instance) {
      Deck.instance = new Deck();
    }
    return Deck.instance;
  }

  getCardCount(): number {
    return this.cards.length;
  }

  getCards(): Card[] {
    return this.cards;
  }

  emptyDeck(): void {
    this.cards = [];
  }

  private initializeDeck(): void {
    for (const suit of Object.values(Suit)) {
      for (const rank of Object.values(Rank)) {
        this.cards.push(new Card(suit as Suit, rank as Rank,));
      }
    }
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  dealHand(numCards: number): Card[] {
    if (numCards > this.cards.length) {
      throw new Error("Not enough cards in the deck.");
    }

    return this.cards.splice(0, numCards);
  }

  toString(): string {
    return this.cards.map((card) => card.toString()).join("\n");
  }
}

export default Deck;
