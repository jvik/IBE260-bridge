export enum Suit {
  Hearts = "Hearts",
  Diamonds = "Diamonds",
  Clubs = "Clubs",
  Spades = "Spades",
}

export enum Rank {
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "Jack",
  Queen = "Queen",
  King = "King",
  Ace = "Ace",
}

class Card {
  suit: Suit;
  rank: Rank;
  constructor(suit: Suit, rank: Rank) {
    // Helper here to make sure that the suit and rank are valid
    if (!Object.values(Suit).includes(suit)) {
      throw new Error("Invalid suit");
    }
    if (!Object.values(Rank).includes(rank)) {
      throw new Error(`Invalid rank ${rank}`);
    }

    this.suit = suit;
    this.rank = rank;
  }

  toString(): string {
    return `${this.rank} of ${this.suit}`;
  }

  getRankValue(): number {
    switch (this.rank) {
      case Rank.Two:
        return 2;
      case Rank.Three:
        return 3;
      case Rank.Four:
        return 4;
      case Rank.Five:
        return 5;
      case Rank.Six:
        return 6;
      case Rank.Seven:
        return 7;
      case Rank.Eight:
        return 8;
      case Rank.Nine:
        return 9;
      case Rank.Ten:
        return 10;
      case Rank.Jack:
        return 11;
      case Rank.Queen:
        return 12;
      case Rank.King:
        return 13;
      case Rank.Ace:
        return 14;
    }
  }

  getSuitValue(): number {
    switch (this.suit) {
      case Suit.Clubs:
        return 1;
      case Suit.Diamonds:
        return 2;
      case Suit.Hearts:
        return 3;
      case Suit.Spades:
        return 4;
    }
  }
}

export default Card;
