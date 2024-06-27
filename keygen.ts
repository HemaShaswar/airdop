import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log("New generated keypair is; ", keypair.secretKey);
