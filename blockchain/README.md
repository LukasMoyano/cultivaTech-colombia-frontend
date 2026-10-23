# Blockchain · CultivaTech ColombIA

Contrato `TrazabilidadAgricola_IR` y scripts para Sepolia.

## Compilar

```bash
node blockchain/scripts/compile.cjs
```

Genera `blockchain/build/TrazabilidadAgricola_IR.json` (ignorado por Git).

## Wallet burner

```bash
node blockchain/scripts/create-wallet.cjs
```

Imprime solo la dirección pública. La llave privada queda en
`blockchain/.wallet.json` con permisos `600` y está ignorada por Git.

## Fondeo Sepolia

- Google Cloud Web3: https://cloud.google.com/application/web3/faucet/ethereum/sepolia
- PoW: https://sepolia-faucet.pk910.de/

## Desplegar

```bash
RPC_URL=https://sepolia.drpc.org node blockchain/scripts/deploy_sepolia.cjs
```

Si el balance es 0, el script no despliega y muestra la dirección a fondear.
El resultado se guarda en `blockchain/deployments/sepolia.json`.

## Variables del backend

Copiar `CONTRACT_ADDRESS` y la llave privada de la wallet a Render como
`CONTRACT_ADDRESS` y `PRIVATE_KEY`. Sin ellas, el backend mantiene la cola en
modo simulación y el frontend lo muestra así.
