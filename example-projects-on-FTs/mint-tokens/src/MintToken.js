import { useState } from "react";
import axios from "axios";

const MintToken = () => {
  const xApiKey = ""; //your x api key here
  const [network,setNetwork] = useState("devnet"); 
  const [privKey, setPrivKey] = useState();
  const [privErr, setPrivError] = useState();
  const [rcvr, setRcvr] = useState();
  const [rcvrErr, setRcvrError] = useState();
  const [tknAddr, setTokenAddr] = useState();
  const [tknError, setTknError] = useState();
  const [amt, setAmt] = useState();
  const [amtErr, setAmtErr] = useState();

  const [serResp, setSerResp ] = useState();
  const [requestStatus, setRequestStatus] = useState('Awaiting Details');
  
  const handleRequest = () => {
    setRequestStatus("In Progress");
    axios({
        // Endpoint to send files
        url: "https://api.shyft.to/sol/v1/token/mint",
        method: "POST",
        headers: {
          "x-api-key": xApiKey
        },
        // Attaching the raw data
        data: {
            network: network,
            private_key: privKey,
            receiver: rcvr,
            token_address: tknAddr,
            amount: Number(amt)
        },
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res);
          setSerResp(JSON.stringify(res.data));
          setRequestStatus(JSON.stringify(res.data.success));
          //setMinted(res.data.result.token_address);
        })
  
        // Catch errors if any
        .catch((err) => {
          console.warn(err);
        });
  } 
  return (
    <div>
      <div className="container-lg py-5">
        <table className="table">
          
          <tr>
                  <td className="p-2">
                    
                      Network<br/>
                    
                    <small>Solana blockchain environment (testnet/devnet/mainnet-beta)</small>

                  </td>
                  <td className="">
                    <select
                      name="network"
                      className="form-select"
                      onChange={(e) => setNetwork(e.target.value)}
                    >
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                      <option value="mainnet-beta">Mainnet Beta</option>
                    </select>
                    
                  </td>
                </tr>
                <tr>
            <td className="p-2 w-25">
              Private Key
              <br />
              <small style={{marginLeft: "-7px"}}>Wallet Address of the person who has mint authority</small>
            </td>
            <td className="pt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Private Key"
                value={privKey}
                onChange={(e) => {
                  if (!e.target.value) {
                    setPrivError("Field Cannot be Empty");
                  } else {
                    setPrivError("");
                  }
                  setPrivKey(e.target.value);
                }}
              />
              <small className="text-danger">{privErr}</small>
            </td>
          </tr>
          <tr>
            <td className="p-2">
              Receiver Address
              <br />
              <small style={{marginLeft: "-7px"}}>Who will receive the units</small>
            </td>
            <td className="pt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Receiver's Public key"
                value={rcvr}
                onChange={(e) => {
                  if (!e.target.value) {
                    setRcvrError("Field Cannot be Empty");
                  } else {
                    setRcvrError("");
                  }
                  setRcvr(e.target.value);
                }}
              />
              <small className="text-danger">{rcvrErr}</small>
            </td>
          </tr>
          <tr>
            <td className="p-2">
              Token Address
              <br />
              <small style={{marginLeft: "-7px"}}>Address of the minted token</small>
            </td>
            <td className="pt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Token Address"
                value={tknAddr}
                onChange={(e) => {
                  if (!e.target.value) {
                    setTknError("Field Cannot be Empty");
                  } else {
                    setTknError("");
                  }
                  setTokenAddr(e.target.value);
                }}
              />
              <small className="text-danger">{tknError}</small>
            </td>
          </tr>
          <tr>
            <td className="p-2">
              Amount
              <br />
              <small style={{marginLeft: "-7px"}}>Amount of Token to be transferred</small>
            </td>
            <td className="pt-3">
              <input
                type="number"
                className="form-control"
                placeholder="units to be transferred"
                value={amt}
                onChange={(e) => {
                  if (e.target.value < 1) {
                    setAmtErr("Value Must Not Be Empty and Be Greater than 1");
                  } else {
                    setAmtErr("");
                  }
                  setAmt(e.target.value);
                }}
              />
              <small className="text-danger">{amtErr}</small>
            </td>
          </tr>
        </table>
        <div className="text-center">
            <button className="btn btn-success" onClick={handleRequest}>Airdrop</button>
        </div>
        <div className="py-4">
            <h6 className="text-center text-danger">Success: {requestStatus}</h6>
            <h4 className="text-center text-info">Server Response</h4>
            <textarea className="form-control" rows="10" value={serResp}></textarea>
        </div>
      </div>
    </div>
  );
};

export default MintToken;
