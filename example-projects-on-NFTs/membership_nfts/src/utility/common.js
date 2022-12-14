import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

import {
  confirmTransactionFromFrontend,
  confirmTransactionFromBackend,
  partialSignWithWallet,
  partialSignWithKey,
} from "./shyft";
import { clusterUrl } from "./utilityfunc";

export async function connectTheWallet() {
  const { solana } = window;
  let res = { success: false, message: "Could not connect wallet", addr: "" };
  if (!solana) {
    alert("Please Install Phantom");
  }
  try {
    const network = "devnet";
    const phantom = new PhantomWalletAdapter();
    await phantom.disconnect();
    await phantom.connect();
    const rpcUrl = clusterApiUrl(network);
    const connection = new Connection(rpcUrl, "confirmed");

    const wallet = {
      address: phantom.publicKey.toBase58(),
    };

    if (wallet.address) {
      const accountInfo = await connection.getAccountInfo(
        new PublicKey(wallet.address),
        "confirmed"
      );
      console.log(accountInfo);
      res.success = true;
      res.message = "Wallet connected successfully";
      res.addr = wallet.address;
    }
  } catch (err) {
    console.log(err);
  }
  return res;
}

export async function signAndConfirmTransaction(
  network,
  transaction,
  callback
) {
  const phantom = new PhantomWalletAdapter();
  await phantom.connect();
  const rpcUrl = clusterUrl(network);
  const connection = new Connection(rpcUrl, "confirmed");
  //console.log(connection.rpcEndpoint);
  const ret = await confirmTransactionFromFrontend(
    connection,
    transaction,
    phantom
  );
  // const checks = await connection.confirmTransaction({signature:ret},'finalised');
  console.log(ret);
  // console.log(checks);
  // await connection.confirmTransaction({
  //     blockhash: transaction.blockhash,
  //     signature: ret,
  //   });
  connection.onSignature(ret, callback, "finalized");
  return ret;
}

export async function signAndConfirm(
  network,
  encodedTransaction,
  privateKey,
  callback
) {
  const phantom = new PhantomWalletAdapter();
  await phantom.connect();
  const rpcUrl = clusterApiUrl(network);
  const connection = new Connection(rpcUrl, "confirmed");

  const ret = await confirmTransactionFromBackend(
    network,
    encodedTransaction,
    privateKey
  );
  console.log(ret);

  connection.onSignature(ret, callback, "finalized");
  return ret;
}
export async function signAndConfirmBoth(
  network,
  encodedTransaction,
  privateKey,
  callback
) {
  const phantom = new PhantomWalletAdapter();
  await phantom.connect();
  const rpcUrl = clusterApiUrl(network);
  const connection = new Connection(rpcUrl, "confirmed");

  const ret2 = await partialSignWithKey(
    network,
    encodedTransaction,
    privateKey
  );
  console.log(ret2);

  const ret1 = await partialSignWithWallet(connection, ret2, phantom);
  console.log(ret1);

  connection.onSignature(ret1, callback, "finalized");
  connection.onSignature(ret2, callback, "finalized");
  return ret1;
  // return ret2;
}
