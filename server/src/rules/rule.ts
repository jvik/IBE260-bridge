import { CardSuit } from "../bids/bid.js";

class Rule {
  ruleSuit: CardSuit;
  ruleRank: number;
  ruleText: string;
  explainerName: string;

  constructor(
    ruleSuit: CardSuit,
    ruleRank: number,
    ruleText: string,
    explainerName: string,
  ) {
    if (ruleText === undefined) {
      throw new Error("Rule text is required");
    }
    this.ruleSuit = ruleSuit;
    this.ruleRank = ruleRank;
    this.ruleText = ruleText;
    this.explainerName = explainerName;
  }
}

export default Rule;
