import {  clusterApiUrl, Connection,PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

import { confirmTransactionsFromFrontend } from './shyft';

export async function signAndConfirmTransactions(network,transactions,callback)
{
    const phantom = new PhantomWalletAdapter();
    await phantom.connect();
    const rpcUrl = clusterApiUrl(network);
    const connection = new Connection(rpcUrl,"confirmed");
    const ret = await confirmTransactionsFromFrontend(connection,transactions,phantom);
    
    console.log("Finalizing Transaction");
    connection.onSignature(ret[0],callback,'finalized')
    return ret;
    
}