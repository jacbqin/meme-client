import { MemeClient } from "./sdk/sdk";
import * as bs58 from "bs58";
import { privateKey } from "./key.json";
import { Keypair, PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
const axios = require("axios");
import base58 from "bs58";
let client = MemeClient.fromEndpoint("https://api.devnet.solana.com");
let user = Keypair.fromSecretKey(bs58.decode(privateKey));
console.log("user", user.publicKey.toBase58());

//名称不能重复
let name = `name-3`;
let symbol = "symbol1";
let uri = "https://amber-worrying-tyrannosaurus-350.mypinata.cloud/ipfs/QmTRMyBtiPpL5jqnqcYVWfzMDJADN8XjJdp1YEMjm6rZCL";
async function main() {
    await create();
    await buy();
}

async function create() {
    const launchAmount = new BN(10e9);
    const duration = new BN(3600 * 24 * 20);
    const userMaxBuyAmount = new BN(0);
    const ts = await client.create(user, name, symbol, uri, launchAmount, duration, userMaxBuyAmount);
    logTs("create", ts);
}

async function buy() {
    const mint = client.findMintPDA(name);
    logTs("buy", await client.buy(user, mint, new BN(1000000e6)));
}

let logTs = function (tag: string, signature: string) {
    console.log(tag, `https://solscan.io/tx/${signature}?cluster=devnet`);
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
