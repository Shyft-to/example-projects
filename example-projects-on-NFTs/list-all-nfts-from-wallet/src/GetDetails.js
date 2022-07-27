import { useState, useEffect } from "react";


const GetDetails = () => {
  
  const [name, setName] = useState("Loading");
  const [desc, setDesc] = useState("");
  const [sym, setSym] = useState("");
  const [imgs, setImgs] = useState(
    "https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  );
  const [mintAddr, setMintAddr] = useState("");
  const [ownAddr, setOwnAddr] = useState("");
  const [roy, setRoy] = useState();
  const [attrib, setAttrib] = useState("");
//   const [tokenParams, setTokenparams] = useState(
//     window.location.search.substring(1)
//   );
  let tokenParams = window.location.search.substring(1);

  let getParams = tokenParams.split("&");

  let apiParams = getParams[1].split("=");
  console.log(apiParams[1]);
  let nftUrl =
    "https://api.shyft.to/sol/v1/nft/read?network=devnet&" + getParams[0]; //change network to testnet or main net beta if using them
  useEffect(() => {
    fetch(nftUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiParams[1],
      },
      //   body: JSON.stringify({ network: "devnet", token_address: "" }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the NFT data from server");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.success);
        setName(data.result.name);
        setDesc(data.result.description);
        setImgs(data.result.image_uri);
        setSym(data.result.symbol);
        setSym(data.result.symbol);
        setOwnAddr(data.result.owner);
        setMintAddr(data.result.mint);
        setRoy(data.result.royalty);
        setAttrib(data.result.attributes);

        console.log(typeof data.result.attributes);
      })
      .catch((errs) => {
        console.log(errs.message);
        // setErrorOcc(true);
      });
  }, [nftUrl]);
  
  useEffect(() => {
    document.title = name;
 }, [name]);

  return (
    <div className="grd-back">
      <div className="container-lg">
        <div className="w-50 mx-auto text-center p-3 pt-5">
          <img
            src={imgs}
            alt=""
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "15px",
              border: "2px solid white",
            }}
          />
        </div>
        <h2 className="pb-2 text-center text-light">{name}</h2>
        <div className="table-container py-4">
          <table className="table table-striped table-dark">
            <tbody>
              <tr>
                <td className="p-3">Description</td>
                <td className="p-3">{desc}</td>
              </tr>
              <tr>
                <td className="p-3">Symbol</td>
                <td className="p-3">{sym}</td>
              </tr>
              <tr>
                <td className="p-3">Royalty</td>
                <td className="p-3">{roy}</td>
              </tr>
              <tr>
                <td className="p-3">Attributes</td>
                <td className="p-3">
                  
                    <div id="attr"></div>
                  {/* {JSON.stringify(attrib)} */}
                  
                  {/* {attrib.map((attribs) => (
                    <div className="attr-crd">
                      <h6>{attribs.trait_type}</h6>
                      <h5>{attribs.value}</h5>
                    </div>
                  ))} */}
                  {
                    Object.entries(attrib).forEach(([key, value]) => {
                      document.getElementById("attr").innerHTML +=  (`<div class="attr-crd m-1" >
                      <h6>${key}</h6>
                      <h5>${value}</h5>
                    </div>`)
                    })
                  }
                </td>
              </tr>
              <tr>
                <td className="p-3">Mint Address</td>
                <td className="p-3">{mintAddr}</td>
              </tr>
              <tr>
                <td className="p-3">Owner Address</td>
                <td className="p-3">{ownAddr}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetDetails;
