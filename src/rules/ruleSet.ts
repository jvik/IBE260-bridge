import Rules from "./rules.js";

class ruleSet {
    private static instance: ruleSet;
    ruleSet: Rules[] = [];
    
    constructor() {
        this.ruleSet = [];
    }

    // Singleton pattern
    static getInstance() {
        if (!ruleSet.instance) {
        ruleSet.instance = new ruleSet();
        }
        return ruleSet.instance;
    }
    addRule(rule: Rules) {
        this.ruleSet.push(rule);
    }
    
}

export default ruleSet;