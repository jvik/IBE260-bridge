class Rules {
  ruleSuit: "spades" | "hearts" | "diamonds" | "clubs" | "no-trump";
  ruleRank: number;
  rule: string;

  constructor(ruleSuit:"spades" | "hearts" | "diamonds" | "clubs" | "no-trump", ruleRank: number, rule: string ) {
    this.ruleSuit = ruleSuit;
    this.ruleRank = ruleRank;
    this.rule = rule;
  }
}

export default Rules;
