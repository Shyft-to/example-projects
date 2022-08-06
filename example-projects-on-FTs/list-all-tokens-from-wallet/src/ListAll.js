import { useEffect, useState } from "react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import axios from "axios";
import { Link } from "react-router-dom";


const ListAll = () => {
  const [walletAddress, setwalletAddress] = useState(null);
  const [data, setData] = useState(null);
  const [netWrk, setNetWork] = useState("devnet");
  const xAPIKey = ""; //Your X-API-KEY here

  //code for connecting wallet
  const solanaConnect = async () => {
    const { solana } = window;
    if (!solana) {
      alert("Please Install Solana");
    }

    try {
      const network = "devnet";
      const phantom = new PhantomWalletAdapter();
      await phantom.connect();
      const rpcUrl = clusterApiUrl(network);
      const connection = new Connection(rpcUrl, "confirmed");
      const wallet = {
        address: phantom.publicKey.toString(),
      };

      if (wallet.address) {
        console.log(wallet.address);

        //we will get the wallet address here, we can assign it to a state variable
        setwalletAddress(wallet.address);
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(wallet.address),
          "confirmed"
        );
        console.log(accountInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let reqUrl = `https://api.shyft.to/sol/v1/wallet/all_tokens?network=${netWrk}&wallet=${walletAddress}`;
    if (walletAddress) {
      axios({
        // Endpoint to perform request
        url: reqUrl,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": xAPIKey,
        },
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res.data);
          setData(res.data.result);
        })
        // Catch errors if any
        .catch((err) => {
          console.warn(err);
        });
    }
  }, [walletAddress, netWrk]);

  return (
    <div>
      <div className="container py-3">
        <div className="card border border-primary p-5">
          <h2 className="display-4 text-center">
            List All Your Fungible Tokens using Shyft APIs
          </h2>
           {!walletAddress && (<div>
            <h4 className="text-center py-3 text-primary">
              Connect Your Wallet to get started
            </h4>
            <div className="text-center pt-3">
              <button
                className="btn btn-primary px-4 py-2"
                onClick={solanaConnect}
              >
                Connect Wallet
              </button>
            </div>
          </div>)}
        </div>

        <div className="py-3">
          <div className="w-25 mx-auto">
            <select
              name="network"
              className="form-control form-select"
              id=""
              onChange={(e) => setNetWork(e.target.value)}
            >
              <option value="devnet">Devnet</option>
              <option value="testnet">Testnet</option>
              <option value="mainnet-beta">Mainnet Beta</option>
            </select>
          </div>
          <div className="card mt-3 py-3 border-0">
            <table className="table w-75 mx-auto text-center">
              <thead>
                <tr>
                  <td className="w-50 border-2">Token Address</td>
                  <td className="w-50 border-2">Balance</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((tokn) => (
                    <tr key={tokn.address}>
                      <td className="w-50 border-2">
                        <Link
                          to={`/view-details?token_address=${tokn.address}&network=${netWrk}`}
                          target="_blank"
                        >
                          {tokn.address}
                        </Link>
                      </td>
                      <td className="w-50 border-2">{tokn.balance}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAll;
