import { useState } from 'react';
import axios from 'axios';

import { signAndConfirmTransaction } from './utilityfunc.js';

function App() {

  const [network,setNetwork] = useState('devnet');
  const [sender,setSender] = useState('');
  const [receiver,setReceiver] = useState('');
  const [nftAddress,setNftAddress] = useState('');
  const [auth,setAuth] = useState(false);

  const [mssg,setMssg] = useState('');
  const callback = (signature,result) => {
    console.log("Signature ",signature);
    console.log("result ",result);
    
    try {
      if(signature.err === null)
      {
        setMssg("Minting successful. You can check your wallet");
      }
      else
      {
        setMssg("Signature Failed");
        
      }
    } catch (error) {
        setMssg("Signature Failed, but check your wallet");
    
    }

  }

  const mintNow = () => {
    console.log("Trying to transfer");
    let nftUrl = `https://api.shyft.to/sol/v1/nft/mint_detach`;

      axios({
        // Endpoint to get NFTs
        url: nftUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "YOUR_X_API_KEY",
        },
        data: {
          network: network,
          wallet: sender,
          master_nft_address: nftAddress,
          receiver: receiver,
          transfer_authority: auth
        }
      })
        // Handle the response from backend here
        .then(async (res) => {
          console.log(res.data);
          if(res.data.success === true)
          {
            const transaction = res.data.result.encoded_transaction;
            const ret_result = await signAndConfirmTransaction(network,transaction,callback); //flow from here goes to utility func
            console.log(ret_result);
          }
          else
          {
            setMssg("Could not create the transaction request");
          }
          
        })
        // Catch errors if any
        .catch((err) => {
          console.warn(err);
          setMssg("Failed! Some error occured");
          
        });

  } 

  
  return (
    <div className="App">
      <div className="container border border-1 border-primary mt-3 py-5">
        <div className="w-75 mx-auto">
          <h2 className='display-5 text-center mb-5'>Enter the details to mint NFT</h2>
          
            <div className="mb-3 mt-3">
              <label className="form-label">Select Network:</label>
              <select className="form-select" onChange={(e) => setNetwork(e.target.value)}>
                <option value="devnet">devnet</option>
                <option value="testnet">testnet</option>
                <option value="mainnet-beta">mainnet</option>
                
              </select>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Master NFT Address:</label>
              <input type="text" className="form-control" placeholder="Enter master NFT address" onChange={(e) => setNftAddress(e.target.value)} />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Sender Wallet ID:</label>
              <input type="text" className="form-control" placeholder="Enter sender wallet address" onChange={(e) => setSender(e.target.value)}/>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Receiver Wallet Address:</label>
              <input type="text" className="form-control" placeholder="Enter Receiver Wallet Address" onChange={(e) => setReceiver(e.target.value)}/>
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Do you want to transfer the update authority of this NFT to the receiver(Ignore for not granting):</label>
              <span className='ms-5'><input type="radio" value="true" name="transAuth" onChange={(e) => setAuth(!auth)} /> Yes grant update authority.</span>
              {/* <span className='ms-5'><input type="radio" value="true" name="transAuth" onChange={(e) => setAuth(!auth)}/> No Don't give authority.</span> */}
            </div>
            
            
            <button onClick={mintNow} className="btn btn-primary">Submit</button>
          
        </div>
      </div>
      <div className='text-center text-danger'>{mssg}</div>
    </div>
  );
}

export default App;
