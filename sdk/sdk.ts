import * as anchor from "@coral-xyz/anchor";
import { Program, BN, EventParser, BorshCoder, AnchorProvider } from "@coral-xyz/anchor";
import { Meme, IDL } from "../target/types/meme";
import { Keypair, PublicKey, Connection, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as spl from "@solana/spl-token";
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { Metaplex } from "@metaplex-foundation/js";

export class MemeClient {
    public connection: Connection;
    public program: Program<Meme>;
    public metaplex: Metaplex;
    public eventParser: EventParser;
    public endpoint: string;

    public static programId: string = "FLkvTZJrcHmUBKZiN5fzggkbFYyvAzz3W4jbBaeasDHN";

    public static fromEndpoint(endpoint: string) {
        const provider = new AnchorProvider(new Connection(endpoint), null, AnchorProvider.defaultOptions());
        const program = new Program(IDL, new PublicKey(MemeClient.programId), provider);
        return new MemeClient(program);
    }

    constructor(program: Program<Meme>) {
        this.connection = program["_provider"].connection;
        this.program = program;
        this.metaplex = Metaplex.make(this.connection);
        this.eventParser = new EventParser(this.program.programId, new BorshCoder(this.program.idl));
        this.endpoint = this.connection["_rpcEndpoint"];
    }

    findMintPDA(name: string) {
        return PublicKey.findProgramAddressSync([Buffer.from(name)], this.program.programId)[0];
    }

    findMemeAccountPDA() {
        return PublicKey.findProgramAddressSync([Buffer.from("MEME")], this.program.programId)[0];
    }

    findMintAccountPDA(mint: PublicKey) {
        return PublicKey.findProgramAddressSync([Buffer.from("Mint"), mint.toBuffer()], this.program.programId)[0];
    }

    findVaultSolAccountPDA() {
        return PublicKey.findProgramAddressSync([Buffer.from("Vault")], this.program.programId)[0];
    }

    findVaultTokenAccountPDA(mint: PublicKey) {
        return PublicKey.findProgramAddressSync([Buffer.from("Vault"), mint.toBuffer()], this.program.programId)[0];
    }

    async queryMemeAccount() {
        return await this.program.account.memeAccount.fetchNullable(this.findMemeAccountPDA());
    }

    async queryMintAccount(mint: PublicKey) {
        return await this.program.account.mintAccount.fetchNullable(this.findMintAccountPDA(mint));
    }

    private async exec(signers: Keypair[], ...transactions: (Transaction | TransactionInstruction)[]) {
        const tx = new Transaction();
        for (const i of transactions) {
            tx.add(i);
        }
        return await anchor.web3.sendAndConfirmTransaction(this.connection, tx, signers, { skipPreflight: true });
    }

    async initializeMeme(admin: Keypair, feeTo: PublicKey, tokenLiquidityAmount: BN, tokenLauchAmount: BN, buyFee: BN, createFee: BN) {
        const method = this.program.methods.initializeMeme(feeTo, tokenLiquidityAmount, tokenLauchAmount, buyFee, createFee).accounts({
            admin: admin.publicKey,
            memeAccount: this.findMemeAccountPDA(),
            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
        });
        // return method.signers([admin]).rpc();
        return this.exec([admin], await method.transaction());
    }

    async updateMeme(admin: Keypair, feeTo: PublicKey, tokenLiquidityAmount: BN, tokenLauchAmount: BN, buyFee: BN, createFee: BN) {
        const method = this.program.methods.updateMeme(feeTo, tokenLiquidityAmount, tokenLauchAmount, buyFee, createFee).accounts({
            admin: admin.publicKey,
            memeAccount: this.findMemeAccountPDA(),
            systemProgram: SystemProgram.programId,
        });
        return this.exec([admin], await method.transaction());
    }

    async create(user: Keypair, name: string, symbol: string, uri: string, launchAmount: BN, duration: BN, userMaxBuyAmount: BN) {
        const mint = this.findMintPDA(name);
        const metadataPDA = this.metaplex.nfts().pdas().metadata({ mint });
        const createTx = await this.program.methods
            .create(name, symbol, uri)
            .accounts({
                user: user.publicKey,
                metadataAccount: metadataPDA,
                tokenMint: mint,
                tokenMetadataProgram: METADATA_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
            })
            .transaction();

        const mintTx = await this.program.methods
            .mint(name, launchAmount, duration, userMaxBuyAmount)
            .accounts({
                user: user.publicKey,
                memeAccount: this.findMemeAccountPDA(),
                tokenMint: mint,
                vaultTokenAccount: this.findVaultTokenAccountPDA(mint),
                mintAccount: this.findMintAccountPDA(mint),
                vaultSolAccount: this.findVaultSolAccountPDA(),
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
            })
            .transaction();
        return this.exec([user, user], createTx, mintTx);
    }

    async buy(user: Keypair, mint: PublicKey, tokenAmount: BN) {
        const feeTo = (await this.queryMemeAccount()).feeTo;
        const method = this.program.methods.buy(tokenAmount).accounts({
            user: user.publicKey,
            memeAccount: this.findMemeAccountPDA(),
            tokenMint: mint,
            feeTo,
            vaultTokenAccount: this.findVaultTokenAccountPDA(mint),
            userTokenAccount: spl.getAssociatedTokenAddressSync(mint, user.publicKey),
            mintAccount: this.findMintAccountPDA(mint),
            vaultSolAccount: this.findVaultSolAccountPDA(),
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
        });
        // return method.signers([user]).rpc();
        return this.exec([user], await method.transaction());
    }

    async emergencyWithdrawSol(user: Keypair, to: PublicKey, amount: BN) {
        const method = this.program.methods.emergencyWithdrawSol(amount).accounts({
            admin: user.publicKey,
            solVaultAccount: this.findVaultSolAccountPDA(),
            memeAccount: this.findMemeAccountPDA(),
            recipientAccount: to,
            systemProgram: SystemProgram.programId,
        });
        return this.exec([user], await method.transaction());
    }

    async emergencyWithdrawToken(admin: Keypair, mint: PublicKey, to: PublicKey, amount: BN) {
        const method = this.program.methods.emergencyWithdrawToken(amount).accounts({
            admin: admin.publicKey,
            memeAccount: this.findMemeAccountPDA(),
            tokenMint: mint,
            vaultTokenAccount: this.findVaultTokenAccountPDA(mint),
            userTokenAccount: spl.getAssociatedTokenAddressSync(mint, to),
            recipientAccount: to,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
        });
        // return method.signers([user]).rpc();
        return this.exec([admin], await method.transaction());
    }
}
