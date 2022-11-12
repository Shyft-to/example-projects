import { clusterApiUrl, Connection } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

import { confirmTransactionFromFrontend } from "./shyft";

export async function signAndConfirmBoth(network,encodedTransaction,callback) 
{
    const phantom = new PhantomWalletAdapter();
    await phantom.connect();
    const rpcUrl = clusterApiUrl(network);
    const connection = new Connection(rpcUrl, "confirmed");
  
    const finalizedTxn = await confirmTransactionFromFrontend(connection,encodedTransaction,phantom);
    console.log(finalizedTxn);
    connection.onSignature(finalizedTxn, callback, "finalized");
    return finalizedTxn;
  }