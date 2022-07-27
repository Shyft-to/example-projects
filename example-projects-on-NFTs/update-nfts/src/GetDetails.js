import { useState } from "react";
import axios from "axios";

const UpdateNFT = () => {
  const [file, setfile] = useState(null);

  const [network, setnetwork] = useState("devnet");
  const [privKey, setprivKey] = useState("");
  const [errPrivKey,setErrPrivkey] = useState();
  const [name, setName] = useState("");
  const [tokAddr, setTokAddr] = useState("");
  const [errToken,setErrToken] = useState();
  const [symbol, setSymbol] = useState("");
  const [desc, setDesc] = useState("");
  const [attr, setAttr] = useState(
    JSON.stringify([{ trait_type: "edification", value: "100" }])
  );
//   const [extUrl, setExtUrl] = useState();
//   const [maxSup, setMaxSup] = useState(1);
  const [roy, setRoy] = useState(0);

  const [status,setStatus] = useState('Awaiting Upload');
  const [txHash,setTxHash] = useState('');
  const [updated,setUpdated] = useState(false);



  const updatenft = (e) => {
    e.preventDefault();
    setStatus('loading');
    let formData = new FormData();
    formData.append("network", network);
    formData.append("private_key", privKey);
    formData.append("token_address", tokAddr);
    if(name !== "")
        formData.append("name", name);
    if(symbol !== "")
        formData.append("symbol", symbol);
    if(desc !== "")
        formData.append("description", desc);
    
    formData.append("attributes", attr);
    
    if(roy !== 0)
        formData.append("royalty", Number(roy));
    if(file)
        formData.append("file", file);

    axios({
        // Endpoint to send files
        url: "https://api.shyft.to/sol/v1/nft/update",
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": '', //Enter your x-api-key here
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },

        // Attaching the form data
        data: formData,
    })
        // Handle the response from backend here
        .then((res) => {
            console.log(res);
            setStatus('Success:'+JSON.stringify(res.data.success));
            setTxHash(res.data.result.txtId);
            if(res.data.success === true)
            {
                setUpdated(true); 
            }
        })

        // Catch errors if any
        .catch((err) => {
            console.warn(err);
        });

}

  return (
    <div>
      <div>
        <div>
          <div className="container border border-secondary my-3">
            <div className="card w-75 mx-auto my-5">
              <div className="card-body">
                <h3 className="card-title text-center">Update NFTs</h3>
                <div className="p-1">
                  <form>
                    <label className="pb-2 mt-1">Network</label>
                    <br />
                    <select
                      name="network"
                      className="form-select"
                      onChange={(e) => setnetwork(e.target.value)}
                    >
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                      <option value="mainnet-beta">Mainnet Beta</option>
                    </select>

                    <label className="pb-2 mt-3">Private Key</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Private Key"
                      value={privKey}
                      onChange={(e)=>{
                        if(!(e.target.value))
                        {
                            setErrPrivkey("Field Cannot be Empty");
                        }
                        else
                        {
                            setErrPrivkey("");
                        }
                        setprivKey(e.target.value)
                        }}
                    />
                    <span className="text-danger">{errPrivKey}</span>
                    <label className="pb-2 mt-3">Token Address</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Token Address of NFT"
                      value={tokAddr}
                      onChange={(e)=>{
                        if(!(e.target.value))
                        {
                            setErrToken("Field Cannot be Empty");
                        }
                        else
                        {
                            setErrToken("");
                        }
                        setTokAddr(e.target.value)
                        }}
                    />
                    <span className="text-danger">{errToken}</span>
                    <label className="pb-2 mt-3">Name</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter NFT Name (Optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <label className="pb-2 mt-3">Symbol</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter NFT Symbol (Optional)"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                    />

                    <label className="pb-2 mt-3">Description</label>
                    <br />
                    <textarea
                      className="form-control"
                      placeholder="Enter Description (Optional)"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      required
                    ></textarea>

                    <label className="pb-2 mt-3">Attributes</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Attributes (Optional)"
                      value={attr} 
                      onChange={(e) => setAttr(e.target.value)}
                    />

                    <label className="pb-2 mt-3">Royalty</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Royalty (Optional)"
                      value={roy} 
                      onChange={(e) => setRoy(e.target.value)}
                    />

                    <label className="pb-2 mt-4 pl-5">File: </label>
                    
                    <input
                        type="file"
                        className="px-5"
                        onChange={(e) => {
                            setfile(e.target.files[0]);
                        }}
                    />
                    <div className="p-4 text-center">
                        <button className="btn btn-primary" onClick={updatenft}>Update NFT</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center p-3">Status -  {status}</div>
          {updated && (<div>
            <div className="text-center">{txHash}</div>
            <div className="m-3 text-center">
                <h6 className="p-2">NFTs take a bit of time to update. Check This NFT after 10 minutes to ensure that it has updated</h6>
                <a href={`/list-details?token_address=${tokAddr}&network=${network}`} className="btn btn-danger" target='_blank' rel="noreferrer">Check NFT</a>
            </div>
          </div>)}
          
        </div>
      </div>
    </div>
  );
};

export default UpdateNFT;
