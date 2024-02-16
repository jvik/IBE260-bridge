import Rules from "./rules.js";

class ruleSet {
<<<<<<< HEAD:src/table/ruleSet.ts
  private static instance: ruleSet;
  ruleSet: Rules[] = [];
=======
    private static instance: ruleSet;
    ruleSet: Rules[] = [];

    constructor() {
        this.ruleSet = [];
    }
>>>>>>> main:src/rules/ruleSet.ts

  constructor() {
    this.ruleSet = [];
  }

  // Singleton pattern
  static getInstance() {
    if (!ruleSet.instance) {
      ruleSet.instance = new ruleSet();
    }
<<<<<<< HEAD:src/table/ruleSet.ts
    return ruleSet.instance;
  }
  addRule(rule: Rules) {
    this.ruleSet.push(rule);
  }
=======
    addRule(rule: Rules) {
        this.ruleSet.push(rule);
    }
>>>>>>> main:src/rules/ruleSet.ts
}

export default ruleSet;
