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
import * as nacl from "tweetnacl";
import { v4 as uuidv4 } from "uuid";
import { decodeUTF8 } from "tweetnacl-util";
import { Md5 } from "ts-md5";

//注意，名称不能重复
const name = `name-002`;
const symbol = "symbol1";
const description = "description1";
const apiPrefix = "https://b.kepler.homes/api/meme";
let token: string;

async function main() {
    // await create();
    // await buy();
    await apiExamples();
}

async function apiExamples() {
    const message = Date.now().toString();
    const messageBytes = decodeUTF8(message);
    const signature = nacl.sign.detached(messageBytes, user.secretKey);
    const data = {
        address: user.publicKey.toString(),
        message,
        signature: bs58.encode(signature),
    };
    console.log(data.signature.length);
    {
        const res = await axios.post(signUrl(`${apiPrefix}/user/login`), data);
        // console.log(res.data);
        token = res.data.token;
    }

    {
        const res = await axios.get(signUrl(`${apiPrefix}/user/profile`), { headers: { Authorization: token } });
        console.log(res.data);
    }

    {
        const res = await axios.get(signUrl(`${apiPrefix}/token/list?offset=0&limit=3&sort=createdTime&order=DESC`), { headers: { Authorization: token } });
        console.log(JSON.stringify(res.data));
    }

    {
        const res = await axios.get(signUrl(`${apiPrefix}/token/info?address=4cFMkd1oVdUKNseVdQgeMw7HqLK8kLcwbedRbV7jpqss`), {
            headers: { Authorization: token },
        });
        console.log(JSON.stringify(res.data));
    }
}

async function create() {
    const form = new FormData();
    form.append("name", name);
    form.append("symbol", symbol);
    form.append("description", description);
    form.append("file", fs.readFileSync("/tmp/1.jpeg"), "1.jpeg");
    const res = await axios.post(signUrl(`${apiPrefix}/token/metadata`), form, {
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

function signUrl(u: string) {
    const signKey = "67489971-205f-467b-b32d-35d58fc99369";
    const url = new URL(u);
    const params = url.searchParams;
    params.append("rt", Date.now().toString());
    params.append("ri", uuidv4());
    params.sort();
    const s = Array.from(params.keys())
        .map((k) => `${k}=${params.get(k)}`)
        .join("&");
    params.append("rs", Md5.hashStr(s + signKey));
    return url.toString();
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
