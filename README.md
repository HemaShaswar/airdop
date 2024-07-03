Final Project result TX link:
https://explorer.solana.com/tx/5RCi8XxzCn1tsDSD7mdtvHeDgRn5Sv5xn7AkgsxSVyKzChVjj8VNCydqAXEsVrLMwDSzqvpqzrZHwZZTbnbT7tWu?cluster=devnet

keygen.ts creates a new solana keypair and logs it to the console
    yarn keygen

NOTE: You need to save the keypair in "./dev-wallet.json" file

airdrop.ts requests 2 sol airdrop
    yarn airdrop

Transfers 0.1 sol from de-wallet.json to the SECOND_WALLET in .env file
    yarn transfer

Interacts with the WBA Prereq program with my github name HemaShaswar as a seed
    yarn enroll
