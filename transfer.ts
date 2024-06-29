import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import "dotenv/config";
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const toString = process.env.SECOND_WALLET_PUBKEY;

if (!toString) {
  throw new Error("Failed to get PUBKEY from environment");
}

const to = new PublicKey(toString);

const conn = new Connection(clusterApiUrl("devnet"), "confirmed");

const ix = SystemProgram.transfer({
  fromPubkey: keypair.publicKey,
  toPubkey: to,
  lamports: 0.1 * LAMPORTS_PER_SOL,
});

const tx = new Transaction();

tx.add(ix);

(async () => {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL / 100,
      })
    );
    transaction.recentBlockhash = (
      await conn.getLatestBlockhash("confirmed")
    ).blockhash;
    transaction.feePayer = keypair.publicKey;

    const signature = await sendAndConfirmTransaction(conn, transaction, [
      keypair,
    ]);
    console.log(` 
      https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`something went wrong: ${e}`);
  }
})();
