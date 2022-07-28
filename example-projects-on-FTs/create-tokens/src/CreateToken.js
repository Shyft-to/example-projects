import { useState } from "react";
import axios from "axios";
const CreateToken = () => {
  const [network,setNetwork] = useState("devnet"); 
  const [privKey,setPrivKey] = useState("");
  const [privErr,setPrivErr] = useState("");
  const [xAPIkey,setXApiKey] = useState(''); //your x-api-key here
  const [name,setName] = useState("");
  const [nameErr,setNameErr] = useState("");
  const [freeAuth,setFreeAuth] = useState("");
  const [mintAuth,setMintAuth] = useState("");
  const [symbol,setSymbol] = useState("");
  const [symError, setSymError] = useState("");
  const [decimals,setDecimals] = useState();
  const [desc, setDesc] = useState("");
  const [descError, setDescError] = useState("");
  const [file,setFile] = useState();
  const [fileError, setFileError] = useState("");

  const [resp,setResp] = useState();
  const [minted,setMinted] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("network",network);
    formData.append("private_key",privKey);
    formData.append("xApiKey",xAPIkey);
    formData.append("name",name);
    formData.append("freeze_authority",freeAuth);
    formData.append("mint_authority",mintAuth);
    formData.append("symbol",symbol);
    formData.append("decimals",decimals);
    formData.append("description ",desc);
    formData.append("file",file);
    
    axios({
        // Endpoint to send files
        url: "https://api.shyft.to/sol/v1/token/create",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": xAPIkey,
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
  
        // Attaching the form data
        data: formData,
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res);
          setResp(JSON.stringify(res.data));
          setMinted(res.data.result.token_address);
        })
  
        // Catch errors if any
        .catch((err) => {
          console.warn(err);
        });
  }

  return (
    <div>
      <div className="container py-5">
        <form>
          <table className="w-100">
            <tbody>
            <tr>
                  <td className="py-3">
                    
                      Network<br/>
                    
                    <small>Solana blockchain environment (testnet/devnet/mainnet-beta)</small>

                  </td>
                  <td className="py-3">
                    <select
                      name="network"
                      className="form-control"
                      onChange={(e) => setNetwork(e.target.value)}
                    >
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                      <option value="mainnet-beta">Mainnet Beta</option>
                    </select>
                    
                  </td>
              </tr>
              <tr>
                <td className="py-3">private_key
                <br />
                  <span className="text-danger">Your Wallets Private Key</span></td>
                <td className="py-3">
                  <input type="text" name="priv_key" className="form-control" value={privKey} onChange={(e)=>{
                    if(!(e.target.value))
                    {
                      setPrivErr("Field Cannot be Empty");
                    }
                    else
                    {
                      setPrivErr("");
                    }
                    setPrivKey(e.target.value)
                    }} required/>
                    <small className="text-danger">{privErr}</small>
                </td>
              </tr>
              <tr>
                <td className="py-3">name
                <br />
                  <span className="text-danger">Your Token Name</span>
                </td>
                <td className="py-3">
                  <input type="text" className="form-control" value={name} onChange={(e)=>{
                    if(!(e.target.value))
                    {
                      setNameErr("Field Cannot be Empty");
                    }
                    else
                    {
                      setNameErr("");
                    }
                    setName(e.target.value)
                  }}/>
                  <small className="text-danger">{nameErr}</small>
                </td>
              </tr>
              <tr>
                <td className="py-3">freeze_authority
                <br />
                  <span className="text-danger">Who has the authority to freeze this token,<br /> no more tokens would be created.</span>
                </td>
                <td className="py-3">
                  <input type="text" className="form-control" value={freeAuth} onChange={(e)=>{
                    setFreeAuth(e.target.value)
                  }}/>
                </td>
              </tr>
              <tr>
                <td className="py-3">mint_authority
                <br />
                <span className="text-danger">Who has the authority to mint more of these tokens.</span>
                </td>
                <td className="py-3">
                  <input type="text" className="form-control" value={mintAuth} onChange={(e)=>setMintAuth(e.target.value)}/>
                </td>
              </tr>
              <tr>
                <td className="py-3">symbol
                <br />
                <span className="text-danger">Token Symbol</span>
                </td>
                <td className="py-3">
                  <input type="text" className="form-control" value={symbol} onChange={(e)=>{
                    if(!(e.target.value))
                    {
                      setSymError("Field Cannot be Empty");
                    }
                    else
                    {
                      setSymError();
                    }
                    setSymbol(e.target.value)
                  }} />
                  {symError}
                </td>
              </tr>
              <tr>
                <td className="py-3">decimals
                <br />
                <span className="text-danger">How many decimals in one token</span>
                </td>
                <td className="py-3">
                  <input type="number" className="form-control" value={decimals} onChange={(e)=>setDecimals(e.target.value)} />
                  {descError}
                </td>
              </tr>
              <tr>
                <td className="py-3">description
                <br />
                <span className="text-danger">Description about the token</span>
                </td>
                <td className="py-3">
                  <textarea name="desc" className="form-control" id="" cols="20" rows="5" value={desc} onChange={(e)=>{
                  if(!(e.target.value))
                  {
                    setDescError("Field Cannot be Empty");
                  }
                  else
                  {
                    setDescError("");
                  }
                  setDesc(e.target.value)
                  }}></textarea>
                </td>
              </tr>
              <tr>
                <td className="py-3">file
                <br />
                <span className="text-danger">Token image to be uploaded</span>
                </td>
                <td className="py-3">
                  <input
                    type="file"
                    className="border border-dark my-4 mx-auto"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn btn-danger" onClick={handleSubmit}>Create</button>
        </form>
        <div className="mt-4">
          <h4>Response</h4>
          <textarea className="form-control" value={resp} rows="7"></textarea>
        </div>
        {minted && (<div className="text-center pt-4">
          <a href={`https://explorer.solana.com/address/${minted}?cluster=devnet`} target="_blank" className="btn btn-primary m-2" rel="noreferrer">View on Explorer</a>
          {/* <a href="/mint-token" className="btn btn-info m-2">AirDrop Token</a> */}
        </div>)}
      </div>
    </div>
  );
};

export default CreateToken;
