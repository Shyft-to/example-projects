import { useState } from "react";
import axios from "axios";
import { signAndConfirmTransactions } from "./common";
const ListTransfer = () => {
  const [network, setNetwork] = useState("devnet");
  const [address, setAddress] = useState("");
  const [sendAddr, setSendAddr] = useState("");

  const [nfts, setNfts] = useState([]);

  const [transferArr, setTransferArr] = useState([]);

  const getNFTs = () => {
    const xKey = ""; //Enter Your X-API-KEY here

    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${address}`;

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
        if (res.data.success === true) setNfts(res.data.result);
      })
      // Catch errors if any
      .catch((err) => {
        console.warn(err);
      });
  };
  const addToList = (item) => {
    setTransferArr((currentAttribs) => [...currentAttribs, item]);
  };
  const callback = (signature, result) => {
    console.log("Signature ", signature);
    console.log("result ", result);
  };

  const startListing = () => {
    const xKey = ""; //Enter Your X-API-KEY here

    axios({
      // Endpoint to list
      url: `https://api.shyft.to/sol/v1/nft/transfer_many`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      data: {
        network: network,
        token_addresses: transferArr,
        from_address: address,
        to_address: sendAddr,
      },
    })
      // Handle the response from backend here
      .then(async (res) => {
        console.log(res.data);
        if (res.data.success === true) {
          const transactions = res.data.result.encoded_transactions;
          const ret_result = await signAndConfirmTransactions(
            network,
            transactions,
            callback
          );
          console.log(ret_result);
        }
      })
      // Catch errors if any
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div>
      <div className="container border border-2 border-primary p-3 mt-5">
        <div className="row pt-2">
          <div className="col-sm-5">
            <select
              className="form-control form-select"
              onChange={(e) => setNetwork(e.target.value)}
            >
              <option value="devnet">Devnet</option>
              <option value="testnet">TestNet</option>
              <option value="mainnet-beta">Mainnet</option>
            </select>
          </div>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Wallet Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="col-sm-2">
            <button className="btn btn-primary w-100" onClick={getNFTs}>
              Get NFTs
            </button>
          </div>
        </div>
        <div className="row pt-2">
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Receiver Wallet Address"
              value={sendAddr}
              onChange={(e) => setSendAddr(e.target.value)}
            />
          </div>
          <div className="col-sm-2">
            <button className="btn btn-info w-100" onClick={startListing}>
              Transfer
            </button>
          </div>
        </div>
      </div>
      <div className="container text-center py-4">
        <h5 className="display-5">All Your NFTs from your wallet</h5>
        <p className="lead text-success">
          <b>{transferArr.length}</b> NFT(s) selected
        </p>
      </div>
      <div className="container pt-4">
        <div className="row">
          {nfts.map((nft) => (
            <div className="col-md-3">
              <div className="card mb-5" style={{ width: "300px" }}>
                <img
                  className="card-img-top"
                  src={nft.cached_image_uri}
                  alt="Card"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
                <div className="card-body">
                  <h4 className="card-title lead">
                    <b>{nft.name}</b>
                  </h4>

                  <button
                    className="btn btn-primary"
                    onClick={() => addToList(nft.mint)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListTransfer;
