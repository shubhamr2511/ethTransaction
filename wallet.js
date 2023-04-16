const cw = require("crypto-wallets")

const WalletA = cw.generateWallet("ETH")
const WalletB = cw.generateWallet("ETH")

console.log("Wallet A: ", WalletA)
console.log("Wallet B: ", WalletB)