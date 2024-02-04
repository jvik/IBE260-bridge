import Card from "@/cards/card.js";

class Rules {
  card: Card;
  rule: string;

  constructor(card: Card, rule: string) {
    this.card = card;
    this.rule = rule;
  }
}

export default Rules;
