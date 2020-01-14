function lerp(low: number[], high: number[], percentage: number): string {
    function lerp(a: number, b: number, r: number): string {
        const d = b - a;
        const v = "000" + Math.round(a + d * r).toString(16);
        return v.substring(v.length - 2);
    }
    return "#" + low.map((v, i) => lerp(low[i], high[i], percentage)).join("");
}

export const colors = {
    grey0: lerp([0, 0, 0], [255, 255, 255], 0.0),
    grey1: lerp([0, 0, 0], [255, 255, 255], 0.1),
    grey2: lerp([0, 0, 0], [255, 255, 255], 0.2),
    grey3: lerp([0, 0, 0], [255, 255, 255], 0.3),
    grey4: lerp([0, 0, 0], [255, 255, 255], 0.4),
    grey5: lerp([0, 0, 0], [255, 255, 255], 0.5),
    grey6: lerp([0, 0, 0], [255, 255, 255], 0.6),
    grey7: lerp([0, 0, 0], [255, 255, 255], 0.7),
    grey8: lerp([0, 0, 0], [255, 255, 255], 0.8),
    grey9: lerp([0, 0, 0], [255, 255, 255], 0.9),
    grey10: lerp([0, 0, 0], [255, 255, 255], 1.0)
};
