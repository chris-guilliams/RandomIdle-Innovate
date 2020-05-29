export class SaveState {
    creds: number;
    maxGambleLoss: number;
    maxGambleGain: number;
    maxWager: number;

    constructor(creds: number, maxGambleLoss: number, maxGambleGain: number, maxWager: number) {
        this.creds = creds;
        this.maxGambleLoss = maxGambleLoss;
        this.maxGambleGain = maxGambleGain;
        this.maxWager = maxWager;
    }
}
