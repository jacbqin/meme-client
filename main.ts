import { MemeClient } from "./sdk/sdk";
import * as bs58 from "bs58";
import { privateKey } from "./key.json";
import { Keypair } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import * as fs from "fs";
const axios = require("axios");
import FormData from "form-data";
let client = MemeClient.fromEndpoint("https://api.devnet.solana.com");
let user = Keypair.fromSecretKey(bs58.decode(privateKey));
console.log("user", user.publicKey.toBase58());

//注意，名称不能重复
const name = `name-6`;
const symbol = "symbol1";
const description = "description1";

async function main() {
    await create();
    await buy();
}

async function create() {
    const form = new FormData();
    form.append("name", name);
    form.append("symbol", symbol);
    form.append("description", description);
    form.append("file", fs.readFileSync("/tmp/SCR-20240517-ml5.jpeg"), "SCR-20240517-ml5.jpeg");
    const res = await axios.post("https://b.kepler.homes/api/meme/token/metadata", form, {
        headers: { ...form.getHeaders() },
    });
    const url = res.data.url;
    console.log("url", url);
    const launchAmount = new BN(10e9);
    const duration = new BN(3600 * 24 * 20);
    const userMaxBuyAmount = new BN(0);
    const ts = await client.create(user, name, symbol, url, launchAmount, duration, userMaxBuyAmount);
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
