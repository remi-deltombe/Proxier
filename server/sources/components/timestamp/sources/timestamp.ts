export class Timestamp {
    private internalTimestamp: number;

    constructor(timestamp: number = 0) {
        this.updateWith(timestamp);
    }

    public timestamp(): number {
        return this.internalTimestamp;
    }

    public updateWith(timestamp: number) {
        this.internalTimestamp = timestamp;
    }

    public updateWithNow() {
        this.updateWith(Date.now());
    }

    public clone(): Timestamp {
        return new Timestamp(this.timestamp());
    }

    public static fromNow(): Timestamp {
        return new Timestamp(Date.now());
    }
}
