const fs = require("fs");
const path = require("path");
const { Wallet } = require("ethers");

const walletPath = path.join(__dirname, "..", ".wallet.json");

if (fs.existsSync(walletPath)) {
  const existente = JSON.parse(fs.readFileSync(walletPath, "utf8"));
  console.log(existente.address);
  process.exit(0);
}

const wallet = Wallet.createRandom();
const payload = {
  address: wallet.address,
  privateKey: wallet.privateKey,
  createdAt: new Date().toISOString(),
};

fs.writeFileSync(walletPath, `${JSON.stringify(payload, null, 2)}\n`, { mode: 0o600 });
fs.chmodSync(walletPath, 0o600);
console.log(wallet.address);
