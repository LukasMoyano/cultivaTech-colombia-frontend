const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

const root = path.join(__dirname, "..");
const walletPath = path.join(root, ".wallet.json");
const artifactPath = path.join(root, "build", "TrazabilidadAgricola_IR.json");
const deploymentsDir = path.join(root, "deployments");

const RPC_URL = process.env.RPC_URL || "https://sepolia.drpc.org";

async function main() {
  if (!fs.existsSync(walletPath)) {
    throw new Error("Falta blockchain/.wallet.json. Ejecuta create-wallet.cjs.");
  }
  if (!fs.existsSync(artifactPath)) {
    throw new Error("Falta el artefacto. Ejecuta compile.cjs.");
  }

  const walletData = JSON.parse(fs.readFileSync(walletPath, "utf8"));
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(walletData.privateKey, provider);
  const balance = await provider.getBalance(wallet.address);

  console.log(`Wallet: ${wallet.address}`);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);

  if (balance === 0n) {
    console.log("Sin saldo en Sepolia. Fondea la wallet y vuelve a ejecutar.");
    console.log("Faucet: https://cloud.google.com/application/web3/faucet/ethereum/sepolia");
    console.log("Faucet PoW: https://sepolia-faucet.pk910.de/");
    process.exit(2);
  }

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contrato = await factory.deploy();
  const tx = contrato.deploymentTransaction();
  console.log(`Desplegando en Sepolia: ${tx.hash}`);
  await contrato.waitForDeployment();
  const receipt = await tx.wait();
  const address = await contrato.getAddress();

  fs.mkdirSync(deploymentsDir, { recursive: true });
  const deployment = {
    network: "sepolia",
    chainId: 11155111,
    address,
    txHash: tx.hash,
    blockNumber: receipt.blockNumber,
    deployer: wallet.address,
    deployedAt: new Date().toISOString(),
  };
  const output = path.join(deploymentsDir, "sepolia.json");
  fs.writeFileSync(output, `${JSON.stringify(deployment, null, 2)}\n`);

  console.log(`Contrato: ${address}`);
  console.log(`Tx: https://sepolia.etherscan.io/tx/${tx.hash}`);
  console.log(`Artefacto: ${output}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
