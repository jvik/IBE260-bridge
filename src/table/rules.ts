import { CardSuit } from "@/bids/bid.js";

class Rules {
  ruleSuit: CardSuit;
  ruleRank: number;
  rule: string;

  constructor(ruleSuit: CardSuit, ruleRank: number, rule: string) {
    this.ruleSuit = ruleSuit;
    this.ruleRank = ruleRank;
    this.rule = rule;
  }
}

export default Rules;
