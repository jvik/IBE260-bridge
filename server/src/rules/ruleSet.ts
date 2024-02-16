import Rule from "./rules.js";

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

  addRule(rule: Rule): void {
    this.ruleSet.push(rule);
  }
}

export default ruleSet;
