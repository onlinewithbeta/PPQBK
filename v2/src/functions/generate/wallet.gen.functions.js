

export default function genWalletAddress() {
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let address = "1"; // wallet addresses usually start with '1' or '3'

    // Generate a random 26-34 character string
    for (let i = 0; i < 33; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        address += chars[randomIndex];
    }

    return address;
}
