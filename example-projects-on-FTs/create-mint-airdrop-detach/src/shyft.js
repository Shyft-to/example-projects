import {clusterApiUrl, Connection, Keypair, Transaction } from '@solana/web3.js';

import { NodeWallet } from '@metaplex/js';
import { decode } from 'bs58';
import { Buffer } from 'buffer';

//import { ShyftWallet } from '../types';

export async function partialSignWithKey(network, encodedTransaction, privateKey) {
  //const connection = new Connection(clusterApiUrl(network), 'confirmed');
  const feePayer = Keypair.fromSecretKey(decode(privateKey));
  // const feePayer2 = Keypair.fromSecretKey(decode(privateKey2));
  //const wallet = new NodeWallet(feePayer);
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, 'base64')
  );

 
  //console.log(typeof arr);
  recoveredTransaction.partialSign(feePayer);
  //recoveredTransaction.partialSign(feePayer2);
  return recoveredTransaction;
}
export async function partialSignWithKeySeries( encodedTransaction, privateKeys) {
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, 'base64')
  );

  if(privateKeys.length < 1)
    return 'Error: No Private Keys Found!';
  else
  {
    privateKeys.forEach(key => {
      const signer = Keypair.fromSecretKey(decode(key));
      recoveredTransaction.partialSign(signer);
    });
  }
  return recoveredTransaction;
}


export async function partialSignWithWallet(connection, encodedTransaction, wallet) {
  console.log(encodedTransaction);
  // const recoveredTransaction = Transaction.from(
  //   Buffer.from(encodedTransaction, 'base64')
  // );
  const signedTx = await wallet.signTransaction(encodedTransaction);
  const confirmTransaction = await connection.sendRawTransaction(
    signedTx.serialize()
  );
  return confirmTransaction;
}


export async function partialSignWithKeyAndWallet(connection,encodedTransaction,privateKey,wallet)
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

export async function partialSignWithKeysAndWallet(connection,encodedTransaction,privateKeys,wallet)
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




export async function confirmTransactionFromBackend(network, encodedTransaction, privateKey) {
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

export async function confirmTransactionFromFrontend(connection, encodedTransaction, wallet) {
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




