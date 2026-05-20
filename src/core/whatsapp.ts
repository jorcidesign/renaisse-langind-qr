export function waURL(num: string, msg: string): string {
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}