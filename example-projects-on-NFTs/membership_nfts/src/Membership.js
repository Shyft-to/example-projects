import { useContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Red from "./resources/images/red-heart.png";
import Blue from "./resources/images/blue-heart.png";
import Green from "./resources/images/green-heart.png";
import { WalletContext } from "./WalletContext";
import axios from "axios";
import { signAndConfirm, signAndConfirmTransaction,signAndConfirmBoth } from "./utility/common";
import { ReactSession } from "react-client-session";
// import { createReadStream } from 'browserify-fs';
// import { resolve } from 'path';
// import { BinaryFile } from 'react-native-binary-file';

const Membership = () => {
  const { walletId } = useContext(WalletContext);
  // reader.readAsText(Red);
  // var fl = new File(["red-heart"],'./resources/images/red-heart.png');
  // console.log(new File(["red-heart"],Green));
  // console.log(createReadStream(resolve(__dirname, './resources/images/red-heart.png')))
  // console.log(new FileReader(fl))
  // const images = require("./resources/images/red-heart.png");
  // console.log(images);

 const [redFileRead,setRedFile] = useState();
 const [greenFileRead,setGreenFile] = useState();
 const [blueFileRead,setBlueFile] = useState();
//  var tmpFile = ""
//  var tmpFile2 = ""
//  var tmpFile3 = ""
  useEffect(() => {
    async function readFiles()
    {
      // await axios(Red).then(res => tmpFile = res.data); // This will have your text inside data attribute
      // var redFile = new Blob([tmpFile], { type: 'image/png' });
      // setRedFile(redFile);

      // await axios(Green).then(res => tmpFile2 = res.data); // This will have your text inside data attribute
      // var greenFile = new Blob([tmpFile2], { type: 'image/png' });
      // setGreenFile(greenFile);

      // await axios(Blue).then(res => tmpFile3 = res.data); // This will have your text inside data attribute
      // var blueFile = new Blob([tmpFile3], { type: 'image/png' });
      // setBlueFile(blueFile);
      const imgData = await axios.get('https://nft-membership-pass.vercel.app/static/media/green-heart.a04b035c23b3f48155b4.png', { responseType: 'stream' });
      setGreenFile(imgData);

      const imgData2 = await axios.get('https://nft-membership-pass.vercel.app/static/media/blue-heart.8d8f55192961a5f6036b.png', { responseType: 'stream' });
      setBlueFile(imgData2);

      const imgData3 = await axios.get('https://nft-membership-pass.vercel.app/static/media/red-heart.27a615f1284e5b509cf1.png', { responseType: 'stream' });
      setRedFile(imgData3);

    }
    
    readFiles();
 },[])

// const reader = new FileReader(Red);
// reader.readAsArrayBuffer();
// reader.onloadend(() => {
//   console.log(reader);
// })


  const navigate = useNavigate();
  // console.log(URL.createObjectURL(Red))
  const callback = (signature, result) => {
    console.log("Signature ", signature);
    console.log("result ", result);
    console.log("Money Deducted");
  };
  const callback2 = (signature, result) => {
    console.log("Sigining Transaction");
    console.log("Signature ", signature);
    console.log("result ", result);
    console.log("In callback 2");
    ReactSession.set("subs_name", "");
    ReactSession.set("subs_addr", null);
    ReactSession.set("subs_expr", "");
    ReactSession.set("subs_discount", "");
    ReactSession.set("subs_actv", false);
    navigate("/login");
  };

  const renewMembership = (value) => {
    // console.log(new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().slice(0, 10));
    const memToken = ReactSession.get("subs_addr") ?? null;
    console.log(memToken);
    
    // var green_file;

    // const readFiles = async () => {
    //   const readFileGreen = await BinaryFile.open('path-to-file');
    // } 
    var formData = new FormData();
    if (memToken) {

      //deduct api call here
    const xKey2 = process.env.REACT_APP_API_KEY;
    const endPoint2 = process.env.REACT_APP_URL_EP;
    // var amount_to_be_deducted = 0;
    // if (value === "green") {
    //   amount_to_be_deducted = 0.5;
    // } else if (value === "blue") {
    //   amount_to_be_deducted = 1;
    // } else {
    //   amount_to_be_deducted = 1.2;
    // }
    const publicKey = process.env.REACT_APP_PUB_KEY; //marketplace owner wallet

    // let nftUrl2 = `${endPoint2}wallet/send_sol_detach`;
    // axios({
    //   // Endpoint to get NFTs
    //   url: nftUrl2,
    //   method: "POST",
    //   headers: {
    //     "x-api-key": xKey2,
    //   },
    //   data: {
    //     network: "devnet",
    //     from_address: walletId,
    //     to_address: publicKey,
    //     amount: amount_to_be_deducted,
    //   },
    // })
    //   // Handle the response from backend here
    //   .then(async (res) => {
    //     //console.log(res.data);
    //     console.log("NFTs: ");
    //     if (res.data.success === true) {
    //       const transaction = res.data.result.encoded_transaction;
    //       const ret_result = await signAndConfirmTransaction(
    //         "devnet",
    //         transaction,
    //         callback
    //       ); //flow from here goes to utility func
    //       console.log(ret_result);
    //     } else {
    //       console.log("failed");
    //     }
    //   })
    //   // Catch errors if any
    //   .catch((err) => {
    //     console.warn(err);
    //   });



      if (value === "green") {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 3))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Green Tier");
        formData.append("image", new File(["redheart.png"],Green));
        formData.append(
          "attributes",
          JSON.stringify([
            {
              trait_type: "name",
              value: "Green Tier",
            },
            {
              trait_type: "discount",
              value: "10",
            },
            {
              trait_type: "start_date",
              value: todayDate,
            },
            {
              trait_type: "exp_date",
              value: expDate,
            },
          ])
        );
        formData.append(
          "service_charge",
          JSON.stringify(
            {
              "receiver": publicKey,
              "amount": 0.5,
            },
          )
        );
      } else if (value === "blue") {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 6))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Blue Tier");
        formData.append("image", new File(["redheart.png"],Blue));
        formData.append(
          "attributes",
          JSON.stringify([
            {
              trait_type: "name",
              value: "Blue Tier",
            },
            {
              trait_type: "discount",
              value: "20",
            },
            {
              trait_type: "start_date",
              value: todayDate,
            },
            {
              trait_type: "exp_date",
              value: expDate,
            },
          ])
        );
        formData.append(
          "service_charge",
          JSON.stringify(
            {
              "receiver": publicKey,
              "amount": 1.0,
            },
          )
        );
      } else {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 9))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Red Tier");
        formData.append("image", new File(["redheart.png"],Red));
        formData.append(
          "attributes",
          JSON.stringify([
            {
              trait_type: "name",
              value: "Red Tier",
            },
            {
              trait_type: "discount",
              value: "40",
            },
            {
              trait_type: "start_date",
              value: todayDate,
            },
            {
              trait_type: "exp_date",
              value: expDate,
            },
          ])
        );
        formData.append(
          "service_charge",
          JSON.stringify(
            {
              "receiver": publicKey,
              "amount": 1.2,
            },
          )
        );
      }
      //const pub_Key = process.env.REACT_APP_PUB_KEY;
      formData.append("network", "devnet");
      formData.append("update_authority_address", publicKey);
      formData.append("token_address", memToken);
      formData.append("fee_payer", walletId);

      const xKey = process.env.REACT_APP_API_KEY;
      //const endPoint = process.env.REACT_APP_URL_EP;
      const privKey = process.env.REACT_APP_PRIV_KEY;
      //const pub_Key = process.env.REACT_APP_PUB_KEY;

      let nftUrl = `https://api.shyft.to/sol/v2/nft/update`;
      axios({
        // Endpoint to get NFTs
        url: nftUrl,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": xKey,
        },
        data: formData,
      })
        // Handle the response from backend here
        .then(async (res) => {
          //console.log(res.data);

          console.log("Trying to Sign Transaction");
          if (res.data.success === true) {
            const transaction = res.data.result.encoded_transaction;
            console.log(transaction);
            const ret_result = await signAndConfirmBoth(
              "devnet",
              transaction,
              privKey,
              callback2
            );
            console.log(ret_result);
          } else {
            console.log("failed");
          }
        })
        // Catch errors if any
        .catch((err) => {
          console.warn(err);
        });
    } else {
      //create to their wallet
      const publicKey = process.env.REACT_APP_PUB_KEY; //marketplace owner wallet
      var formData = new FormData();
      if (value === "green") {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 3))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Green Tier");
        formData.append("image", new File(["redheart.png"],Green,{
          type: "image/png",
        }));
        // formData.append('file', fs.createReadStream(path.resolve(__dirname, Green)));
        
        formData.append(
          "attributes",
          JSON.stringify([
            {
              trait_type: "name",
              value: "Green Tier",
            },
            {
              trait_type: "discount",
              value: "10",
            },
            {
              trait_type: "start_date",
              value: todayDate,
            },
            {
              trait_type: "exp_date",
              value: expDate,
            },
          ])
        );
        formData.append(
          "service_charge",
          JSON.stringify(
            {
              "receiver": publicKey,
              "amount": 0.5,
            },
          )
        );
      } else if (value === "blue") {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 6))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Blue Tier");
        formData.append("image", new File(["redheart.png"],Blue));
        formData.append(
          "attributes",
          JSON.stringify([
            {
              trait_type: "name",
              value: "Blue Tier",
            },
            {
              trait_type: "discount",
              value: "20",
            },
            {
              trait_type: "start_date",
              value: todayDate,
            },
            {
              trait_type: "exp_date",
              value: expDate,
            },
          ])
        );
        formData.append(
          "service_charge",
          JSON.stringify(
            {
              "receiver": publicKey,
              "amount": 1.0,
            },
          )
        );
      } else {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 9))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Red Tier");
        formData.append("image", new File(["redheart.png"],Red));
        formData.append(
          "attributes",
          JSON.stringify([
            {
              trait_type: "name",
              value: "Red Tier",
            },
            {
              trait_type: "discount",
              value: "40",
            },
            {
              trait_type: "start_date",
              value: todayDate,
            },
            {
              trait_type: "exp_date",
              value: expDate,
            },
          ])
        );
        formData.append(
          "service_charge",
          JSON.stringify(
            {
              "receiver": publicKey,
              "amount": 1.2,
            },
          )
        );
      }
      formData.append("network", "devnet");
      formData.append("creator_wallet", publicKey);
      formData.append("fee_payer", walletId);
      formData.append("symbol", "MEM");
      formData.append("max_supply", 0);
      formData.append("royalty", 1);
      formData.append("receiver", walletId);
      const xKey = process.env.REACT_APP_API_KEY;
      const privKey = process.env.REACT_APP_PRIV_KEY;

      let nftUrl = `https://api.shyft.to/sol/v2/nft/create`;
      axios({
        // Endpoint to get NFTs
        url: nftUrl,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": xKey,
        },
        data: formData,
      })
        // Handle the response from backend here
        .then(async (res) => {
          //console.log(res.data);
          // console.log("NFTs: ");
          if (res.data.success === true) {
            const transaction = res.data.result.encoded_transaction;
            console.log(transaction);
            const ret_result = await signAndConfirmBoth(
              "devnet",
              transaction,
              privKey,
              callback2
            ); //flow from here goes to utility func
            
            console.log(ret_result);
          } else {
            console.log("failed");
          }
        })
        // Catch errors if any
        .catch((err) => {
          console.warn(err);
        });
    }
  };
  return (
    <div>
      <div className="background-1">
        <div className="container-xl">
          <h2 className="main-heading text-center">Subscribe</h2>
          <h4 className="sub-heading mb-5 text-center">
            Get One of Our NFT Subscriptions{" "}
          </h4>
          <div className="card-section py-5 w-75 mx-auto">
            <div className="row">
              <div className="col-md-12 col-lg-4">
                <div
                  className="card bg-dark p-1 my-2 rounded-3 border-light mx-auto"
                  style={{ width: "250px" }}
                >
                  <img
                    className="card-img-top"
                    src={Green}
                    alt="Card small"
                    style={{ width: "100%" }}
                  />
                  <div className="card-body">
                    <h4 className="card-title text-light cfont">
                      Green Tier (3 months)
                    </h4>
                    <p className="card-text text-light cfont">
                      10% discount - 0.5 SOL
                    </p>
                    <button
                      className="btn btn-light py-0 px-3 rounded-pill cfont"
                      onClick={() => renewMembership("green")}
                    >
                      Get Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div
                  className="card bg-dark p-1 my-2 rounded-3 border-light mx-auto"
                  style={{ width: "250px" }}
                >
                  <img
                    className="card-img-top"
                    src={Blue}
                    alt="Card mid"
                    style={{ width: "100%" }}
                  />
                  <div className="card-body">
                    <h4 className="card-title text-light cfont">
                      Blue Tier (6 months)
                    </h4>
                    <p className="card-text text-light cfont">
                      20% discount - 1 SOL
                    </p>
                    <button
                      className="btn btn-light py-0 px-3 rounded-pill cfont"
                      onClick={() => renewMembership("blue")}
                    >
                      Get Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div
                  className="card bg-dark p-1 my-2 rounded-3 border-light mx-auto"
                  style={{ width: "250px" }}
                >
                  <img
                    className="card-img-top"
                    src={Red}
                    alt="Card big"
                    style={{ width: "100%" }}
                  />
                  <div className="card-body">
                    <h4 className="card-title text-light cfont">
                      Red Tier (9 months)
                    </h4>
                    <p className="card-text text-light cfont">
                      40% discount - 1.2 SOL
                    </p>
                    <button
                      className="btn btn-light py-0 px-3 rounded-pill cfont"
                      onClick={() => renewMembership("red")}
                    >
                      Get Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
