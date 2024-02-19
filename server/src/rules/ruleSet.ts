import BidLog from "../bids/bidLog.js";
import Rule from "./rule.js";

class ruleSet {
  private static instance: ruleSet;
  ruleSet: Rule[] = [];

  constructor() {
    this.ruleSet = [];
  }

  // Singleton pattern
  static getInstance(): ruleSet {
    if (!ruleSet.instance) {
      ruleSet.instance = new ruleSet();
    }
    return ruleSet.instance;
  }

  getLastRule(): Rule | undefined {
    return this.ruleSet[this.ruleSet.length - 1];
  }

  addRule(rule: Rule): void {
    // Ensure that the rule doesn't have a duplicate
    const identicalRank =
      rule.ruleRank === ruleSet.getInstance().getLastRule()?.ruleRank;
    const identicalSuit =
      rule.ruleSuit === ruleSet.getInstance().getLastRule()?.ruleSuit;
    if (identicalRank && identicalSuit) {
      throw new Error("Rule already exists for this table.");
    }

    // Reset explainerName on the bidLog so that the next bid can be made
    const bidLog = BidLog.getInstance();
    bidLog.explainerName = undefined;

    this.ruleSet.push(rule);
  }

  ruleAlreadyExists(rule: Rule): boolean {
    return this.ruleSet.includes(rule); // pretty sure this doesn't work right lol
  }
}

export default ruleSet;
