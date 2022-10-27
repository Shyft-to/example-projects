import { ReactSession } from "react-client-session";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Red from "./resources/images/red-heart.png";
import Blue from "./resources/images/blue-heart.jpeg";
import Green from "./resources/images/green-heart.jpeg";
import { WalletContext } from "./WalletContext";
import axios from "axios";
import { signAndConfirm, signAndConfirmTransaction } from "./utility/common";
import {ReactSession} from 'react-client-session';

const Membership = () => {
  const { walletId } = useContext(WalletContext);
  const navigate = useNavigate();
  const callback = (signature, result) => {
    console.log("Signature ", signature);
    console.log("result ", result);
    
  };
  const callback2 = (signature, result) => {
    console.log("Signature ", signature);
    console.log("result ", result);
    ReactSession.set("subs_name", "");
    ReactSession.set("subs_addr", "");
    ReactSession.set("subs_expr", "");
    ReactSession.set("subs_discount", "");
    ReactSession.set("subs_actv", false);
    navigate('/login');
  };

  const renewMembership = (value) => {
    // console.log(new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().slice(0, 10));
    const memToken = ReactSession.get("subs_addr") ?? null;

    //deduct api call here
    const xKey = process.env.REACT_APP_API_KEY;
    const endPoint = process.env.REACT_APP_URL_EP;
    var amount_to_be_deducted = 0;
    if (value === "green") {
      amount_to_be_deducted = 0.5;
    } else if (value === "blue") {
      amount_to_be_deducted = 1;
    } else {
      amount_to_be_deducted = 1.2;
    }
    const publicKey = process.env.REACT_APP_PUB_KEY; //marketplace owner wallet

    let nftUrl = `${endPoint}wallet/send_sol_detach`;
    axios({
      // Endpoint to get NFTs
      url: nftUrl,
      method: "POST",
      headers: {
        "x-api-key": xKey,
      },
      data: {
        network: "devnet",
        from_address: walletId,
        to_address: publicKey,
        amount: amount_to_be_deducted,
      },
    })
      // Handle the response from backend here
      .then(async (res) => {
        //console.log(res.data);
        console.log("NFTs: ");
        if (res.data.success === true) {
          const transaction = res.data.result.encoded_transaction;
          const ret_result = await signAndConfirmTransaction(
            "devnet",
            transaction,
            callback
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

    var formData = new FormData();
    if (memToken) {
      if (value === "green") {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 3))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Green Tier");
        formData.append("file", Green);
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
      } else if (value === "blue") {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 6))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Blue Tier");
        formData.append("file", Blue);
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
      } else {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 9))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Red Tier");
        formData.append("file", Red);
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
      }
      formData.append("network", "devnet");
      formData.append("wallet", walletId);
      formData.append("token_address", memToken);

      const xKey = process.env.REACT_APP_API_KEY;
      const endPoint = process.env.REACT_APP_URL_EP;
      const privKey = process.env.REACT_APP_PRIV_KEY;

      let nftUrl = `${endPoint}nft/update_detach`;
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
          
          console.log("NFTs: ");
          if (res.data.success === true) {
            const transaction = res.data.result.encoded_transaction;
            const ret_result = await signAndConfirm(
              "devnet",
              transaction,
              callback,
              privKey
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
        formData.append("file", Green);
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
          JSON.stringify([
            {
              receiver: publicKey,
              amount: 0.5
            },
          ])
        );
      } else if (value === "blue") {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 6))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Blue Tier");
        formData.append("file", Blue);
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
          JSON.stringify([
            {
              receiver: publicKey,
              amount: 1.0
            },
          ])
        );
      } else {
        var todayDate = new Date().toISOString().slice(0, 10);
        var expDate = new Date(new Date().setMonth(new Date().getMonth() + 9))
          .toISOString()
          .slice(0, 10);
        formData.append("name", "Red Tier");
        formData.append("file", Red);
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
          JSON.stringify([
            {
              receiver: publicKey,
              amount: 1.2
            },
          ])
        );
      }
      formData.append("creator_wallet", publicKey);
      formData.append("fee_payer", walletId);
      formData.append("symbol","MEM");
      formData.append("max_supply",0);
      formData.append("royalty",1);



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
          console.log("NFTs: ");
          if (res.data.success === true) {
            const transaction = res.data.result.encoded_transaction;
            const ret_result = await signAndConfirm(
              "devnet",
              transaction,
              callback,
              privKey
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
                      20% discount - 0.5 SOL
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
                      30% discount - 1 SOL
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
