import { clusterApiUrl, Connection, Keypair, Transaction } from '@solana/web3.js';

import { NodeWallet } from '@metaplex/js';
import { decode } from 'bs58';
import { Buffer } from 'buffer';


export async function confirmTransactionFromBackend(network, encodedTransaction, privateKey) //function for signing transactions using the private key for one signer
{
    const connection = new Connection(clusterApiUrl(network), 'confirmed');
    const feePayer = Keypair.fromSecretKey(decode(privateKey));
    const wallet = new NodeWallet(feePayer);
    const recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, 'base64')
    );
    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(
        signedTx.serialize()
    );
    return confirmTransaction;
}

export async function confirmTransactionFromFrontend(connection, encodedTransaction, wallet) //function for signing transactions using the wallet for one signer
{
    console.log(encodedTransaction);
    const recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, 'base64')
    );
    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(
        signedTx.serialize()
    );
    return confirmTransaction;
}


export async function partialSignWithKeyAndWallet(connection, encodedTransaction, privateKey, wallet) //function for partially signing transactions using one private key and a wallet popup
{
    const feePayer = Keypair.fromSecretKey(decode(privateKey));
    const recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, 'base64')
    );
    recoveredTransaction.partialSign(feePayer);
    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(
        signedTx.serialize()
    );
    return confirmTransaction;

}

export async function partialSignWithKeysAndWallet(connection, encodedTransaction, privateKeys, wallet) //function for partially signing transactions using n private keys and a wallet popup
{
    const recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, 'base64')
    );
    const keys = privateKeys.map((k) => {
        return Keypair.fromSecretKey(decode(k));
    });

    recoveredTransaction.partialSign(...keys);


    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(
        signedTx.serialize()
    );
    return confirmTransaction;

}

