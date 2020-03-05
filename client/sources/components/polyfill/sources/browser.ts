export function openLink(url: string, blank: boolean = false) {
    const a = document.createElement("a");
    a.href = url;
    a.target = blank ? "_blank" : "";
    a.click();
}
