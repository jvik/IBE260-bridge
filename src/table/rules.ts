class Rules {
    suit: "spades" | "hearts" | "diamonds" | "clubs" | "no-trump";
    rank: number;
    rule: string;

    constructor(suit: "spades" | "hearts" | "diamonds" | "clubs" | "no-trump",
    rank: number, rule: string) {
        this.suit = suit;
        this.rank = rank;
        this.rule = rule;
    }
}

export default Rules;