# Transaction Signers with SHYFT

The `signer.js` contains all the functions required for signing `encoded_transaction`s. These are a few functions which you can use for signing `encoded_transaction` returned form [SHYFT APIs](https://shyft.to). 

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

## Signing Transaction with one wallet.

In certain situations, instead on one `encoded_transaction` SHYFT APIs return more than one, or an array of `encoded_transactions`, which will need a sign from the wallet in the frontend. In such cases, we will use the following function:

```javascript
export async function confirmTransactionsFromFrontend(connection, encodedTransactions, wallet) {
  
    const recoveredTransactions = encodedTransactions.map((tx) => {
      return Transaction.from(
        Buffer.from(tx, 'base64')
      );
    });
  
    const signedTx = await wallet.signAllTransactions(recoveredTransactions); //signs all the transactions in the recoveredTransactions array in one go
    
    var sentTxns = [];
    for await(const tx of signedTx)
    {
      const confirmTransaction = await connection.sendRawTransaction(
        tx.serialize()
      );
      sentTxns.push(confirmTransaction);
    }

    return sentTxns;
    
  }
```
This function accepts `connection`, the `encoded_transactions` (an array of `encoded_transaction`) from the SHYFT API response and the `wallet` object. Details regarding the `connection` and `wallet` have been discussed at the start of this text.


# Usage

Suppose we have just made a `create_v2` API call received the `encoded_transaction` in the response of the API call. Let us suppose that we require three signers to sign this `encoded_transaction`, where we have the private key of two signers available and one of the signers will sign it from the frontend. 

```javascript
    var encodedTransaction;
    axios({
      // Endpoint to get NFTs
      url: `https://api.shyft.to/sol/v2/nft/create`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": x-Api-Key,
      },
      data: formData,
    })
      // Handle the response from backend here
      .then(async (res) => {
        encodedTransaction = res.data.result.encoded_transaction;
        //encoded transaction received in response

      })
      // Catch errors if any
      .catch((err) => {
        console.warn(err);
      });

```  

This `encodedTransaction` is then sent as a parameter to the function `partialSignWithKeysAndWallet()` along with private keys, wallet object, and connection in the following manner.

```javascript
const phantom = new PhantomWalletAdapter();
await phantom.connect(); //wallet object
const rpcUrl = clusterApiUrl(network);
const connection = new Connection(rpcUrl, "confirmed"); //connection

privateKeys = ["privatekey1","privatekey2"]

const finalizedTxn = partialSignWithKeysAndWallet(connection,encodedTransaction,privateKeys,phantom ); //This will successfully sign the transaction
```

Also checkout our doc on Signing Transactions [here](https://docs.shyft.to/tutorials/how-to-sign-transactions-on-solana).