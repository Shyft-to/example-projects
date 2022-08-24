import { useEffect, useState } from "react";

import {  clusterApiUrl, Connection,PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import axios from 'axios';

import spaceShip from './spaceship.png';

const ConnectWallet = () => {
    const [walletId,setWalletId] = useState(null);
    const [hasAccess,setAccess] = useState(false);
    const [msg,setMsg] = useState("");

    const [nfts,setNfts] = useState(null);

    const connectWallet = async () => {
        const { solana } = window;
        
        if(!solana)
        {
            alert("Please Install Phantom");
        }
        try{  
            const network = "devnet";
            const phantom = new PhantomWalletAdapter();
            //await phantom.disconnect();
            await phantom.connect();
            const rpcUrl = clusterApiUrl(network);
            const connection = new Connection(rpcUrl,"confirmed");
            
            const wallet = {
                address: phantom.publicKey.toBase58(),
            };

            if(wallet.address)
            {
                const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address),"confirmed");
                console.log(accountInfo); 
                console.log('Wallet Connected'); 
                setWalletId(wallet.address);
            }

        }
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() => {
        let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=devnet&address=${walletId}`;
        const xKey = 'your-x-api-key-from-shyft-website'

        axios({
          // Endpoint to get NFTs
          url: nftUrl,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xKey,
          },
        })
          // Handle the response from backend here
          .then((res) => {
            console.log(res.data);
            if (res.data.success === true) {
              setNfts(res.data.result);
            } 
          })
          // Catch errors if any
          .catch((err) => {
            console.warn(err);
            
          });
    
     
    }, [walletId]);

    useEffect(() => {
        if (nfts !== null) {
            let flag = 0;
            nfts.forEach((element) => {
              if (
                element.update_authority ===
                "wallet_address_of_the_wallet_who_has_the_update_authority" //add the wallet address which you want to check as an authentication parameter
                //access will be granted if and only if an NFT with this update authority is present in your wallet
              ) {
                flag = 1;
              }
            });
            if (flag === 1) {
                setAccess(true);
            } else {
                setAccess(false);
                setMsg('You do not have access');
            }
          }
    
    }, [nfts])
    
    

    return ( 
    <div>
        {!hasAccess && <div className="container text-center pt-3">
            <div className="border border-2 border-warning rounded mt-5 p-4 bg-dark mx-auto">
                <h2 className="display-6 text-light py-5">Connect Your Wallet to check if you have access to the portal</h2>
                <button className="btn btn-primary mb-5" onClick={connectWallet}>Connect Wallet</button>
            </div>
            <p className="text-danger text-center py-4">{msg}</p>
        </div>}
        {hasAccess && <div className="container-fluid bg-dark text-center" style={{height: "100vh"}}>
            <h2 className="display-3 text-light py-5 mb-5">
                Yayy! You have access to our space station
            </h2>
            <img src={spaceShip} style={{width: "12%", marginTop: "20px"}} alt="" />
        </div>}
    </div> 
);
}
 
export default ConnectWallet;