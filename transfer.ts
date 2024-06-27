import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const keypair2 = Keypair.generate();

const conn = new Connection(clusterApiUrl("devnet"), "confirmed");

const ix = SystemProgram.transfer({
  fromPubkey: keypair.publicKey,
  toPubkey: keypair2.publicKey,
  lamports: 0.1 * LAMPORTS_PER_SOL,
});

const tx = new Transaction();

tx.add(ix);

(async () => {
  try {
    // We're going to claim 2 devnet SOL tokens
    const txhash = await sendAndConfirmTransaction(conn, tx, [keypair]);

    console.log(`
          https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
