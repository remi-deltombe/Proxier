export class Uuid {
    private uuid: string;
    private static used: string[] = [];

    constructor(uuid?: string) {
        if (uuid) {
            this.uuid = uuid;
            Uuid.used.push(uuid);
        } else {
            this.uuid = Uuid.generate();
        }
    }

    public toString(): string {
        return this.uuid;
    }

    private static generate(): string {
        let uuid: string;
        do {
            uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                c => {
                    const r = (Math.random() * 16) | 0;
                    const v = c == "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                }
            );
        } while (Uuid.used.includes(uuid));
        return uuid;
    }
}
