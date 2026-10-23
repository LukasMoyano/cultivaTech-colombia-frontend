const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const contractPath = path.join(root, "contracts", "TrazabilidadAgricola_IR.sol");
const buildDir = path.join(root, "build");
const artifactPath = path.join(buildDir, "TrazabilidadAgricola_IR.json");
const sourceName = "TrazabilidadAgricola_IR.sol";

fs.mkdirSync(buildDir, { recursive: true });

const input = {
  language: "Solidity",
  sources: {
    [sourceName]: { content: fs.readFileSync(contractPath, "utf8") },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

const raw = execFileSync(
  "npx",
  ["--yes", "solc@0.8.19", "--standard-json"],
  { input: JSON.stringify(input), encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
);

const jsonStart = raw.indexOf("{");
if (jsonStart < 0) throw new Error("solc no devolvió JSON.");
const parsed = JSON.parse(raw.slice(jsonStart));
if (parsed.errors) {
  const errores = parsed.errors.filter((error) => error.severity === "error");
  if (errores.length > 0) {
    throw new Error(errores.map((error) => error.formattedMessage).join("\n"));
  }
}

const contrato = parsed.contracts?.[sourceName]?.TrazabilidadAgricola_IR;
if (!contrato) {
  throw new Error("No se encontró TrazabilidadAgricola_IR en la salida de solc.");
}

const artifact = {
  contractName: "TrazabilidadAgricola_IR",
  compiler: "0.8.19",
  source: "blockchain/contracts/TrazabilidadAgricola_IR.sol",
  abi: contrato.abi,
  bytecode: `0x${contrato.evm.bytecode.object}`,
};

fs.writeFileSync(artifactPath, `${JSON.stringify(artifact, null, 2)}\n`);
console.log(`Artefacto generado: ${artifactPath}`);
