import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { connectTheWallet } from "./utility/common";
import { WalletContext } from "./WalletContext";
import axios from "axios";
import { ReactSession } from "react-client-session";

import iLove8bit from "./resources/i-love-8-bit.png";

const Checker = () => {
  const { walletId, setWalletId } = useContext(WalletContext);
  const navigate = useNavigate();
  const solanaConnect = async () => {
    // ReactSession.set("connected_wallet", '');
    console.log("clicked solana connect");
    const resp = await connectTheWallet();
    //console.log(resp);
    //ReactSession.set("connected_wallet", resp.addr);
    setWalletId(resp.addr);
    // navigate('/wallet/' + resp.addr);
    const xKey = process.env.REACT_APP_API_KEY;
    const endPoint = process.env.REACT_APP_URL_EP;

    let nftUrl = `${endPoint}nft/read_all?network=devnet&address=${resp.addr}`;

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
        //console.log(res.data);
        console.log("NFTs: ");
        if (res.data.success === true) {
          const allNfts = res.data.result;
          if (allNfts.length < 1) {
            navigate("/membership");
          }

          allNfts.forEach((element) => {
            if (
              element.name === "Red Tier" ||
              element.name === "Green Tier" ||
              element.name === "Blue Tier"
            ) {
              ReactSession.set("subs_name", element.name);
              ReactSession.set("subs_addr", element.mint);
              ReactSession.set("subs_expr", element.attributes.exp_date);
              ReactSession.set("subs_discount", element.attributes.discount);

              console.log("Memberships ends on: ", element.attributes.end_date);

              var todayDate = new Date().toISOString().slice(0, 10);
              var dateToday = new Date(todayDate);
              var dateExpiry = new Date(element.attributes.end_date);
              var diffDays = parseInt(
                (dateExpiry - dateToday) / (1000 * 60 * 60 * 24),
                10
              );

              if (diffDays > 0) {
                navigate("/membership");
                ReactSession.set("subs_actv", false);
              } else {
                ReactSession.set("subs_actv", true);
                navigate("/");
              }
            } else navigate("/membership");
          });
        } else {
        }
      })
      // Catch errors if any
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <div>
      <div className="background-1">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-12 col-lg-7 p-5">
              <h2 className="main-heading mb-3">HearthStore</h2>
              <h4 className="sub-heading mb-5">
                Just another fantasy marketplace for your 8-bit needs.
              </h4>
              <button
                className="btn btn-dark px-4 rounded-pill bit-btn"
                onClick={solanaConnect}
              >
                Connect Wallet
              </button>
            </div>
            <div className="col-md-12 col-lg-5">
              <div className="img-container">
                <img className="img-fluid" src={iLove8bit} alt="8 bit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checker;
