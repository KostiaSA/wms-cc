
export function byteArrayAsSql(bytes: any[]):string {
    return "0x"+bytes.map(function (byte: any) {
        return ("00" + (byte & 0xFF).toString(16)).slice(-2);
    }).join("");
}