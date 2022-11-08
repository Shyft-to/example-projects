# Transaction Signers with SHYFT
These are a few functions which you can use for signing `encoded_transaction` returned form SHYFT APIs. 

Few of the functions require the `connection` object, and the `wallet` object. Here is how you can get them for phantom wallet.

```javascript
const phantom = new PhantomWalletAdapter();
await phantom.connect();
const rpcUrl = clusterApiUrl(network);
const connection = new Connection(rpcUrl, "confirmed");
```

Here `phantom` is the wallet object and is passed on as a wallet parameter, and `connection` is the connection object.

## Signing Transaction with one private key and one wallet.

The function used for this purpose is:

```javascript
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
```

This function accepts 4 parameters: the `connection` object, the `wallet` object as discussed above, the `encoded_transaction` received from SHYFT APIs and the private key of the partial signer.

## Signing Transaction with n private keys and one wallet.

The function used for this purpose is:

```javascript
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
```

This function accepts 4 parameters: the `connection` object, the `wallet` object as discussed above, the `encoded_transaction` received from SHYFT APIs and the private keys of the partial signers as an array.

## Signing Transaction with one private key.

The function used for this purpose is:

```javascript
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
```

This function accepts `network`, which is the Solana network cluster (devnet,testnet, or mainnet-beta), the `encoded_transaction` from the SHYFT API response and the private key of the signer.

## Signing Transaction with one wallet.

The function used for this purpose is:

```javascript
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
```

This function accepts `connection`, the `encoded_transaction` from the SHYFT API response and the `wallet` object. Details regarding the connection and wallet have been discussed at the start of this text.

We hope you can sign any transaction, using this signing tool offline, or you can also check out our online signing tool [here](https://shyft-insider.vercel.app). 





