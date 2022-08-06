import { useEffect, useState } from "react";
import axios from "axios";

const Details = () => {
    const [image,setimage] = useState('https://biteable.com/content/uploads/2018/01/royalty-free-images-cover_social-media-ls-1200x630-c-center.jpg');
    const [name,setName] = useState(null);
    const [desc,setDesc] = useState(null);
    const [sym,setSym] = useState(null);
    const [tokAddr,setTokAddr] = useState(null);
    const [mint,setmint] = useState(null);
    const [freeze,setFreeze] = useState(null);
    const [deci,setDeci] = useState(null);
    const [curSup,setCurSup] = useState(null);

    const xAPIKey = ''; //Your X-API-KEY here
    const ApiParams = window.location.search.substring(1);

    useEffect(() => {
        let reqUrl = `https://api.shyft.to/sol/v1/token/get_info?${ApiParams}`;
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
              if(res.data.success === true)
              {
                setName(res.data.result.name);
                setDesc(res.data.result.description);
                setimage(res.data.result.image);
                setSym(res.data.result.symbol);
                setTokAddr(res.data.result.address);
                setmint(res.data.result.mint_authority);
                setFreeze(res.data.result.freeze_authority);
                setDeci(res.data.result.decimals);
                setCurSup(res.data.result.current_supply);
              }
              else
              {
                setName('Failed to Load Data');
              }
                
            })
            // Catch errors if any
            .catch((err) => {
              console.warn(err);
              setName('Failed to Load Data');
            });
    },[ApiParams]);
    return ( 
        <div>
           <div className="container">
                <div className="card border-primary py-3 px-1 mt-5 w-75 mx-auto">
                    <div className="image-container w-25 mx-auto mt-3">
                        <img src={image} alt="" className="img-fluid" />
                    </div>
                    <div className="mt-3 p-3">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td className="w-50">Name</td>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <td className="w-50">Description</td>
                                    <td>{desc}</td>
                                </tr>
                                <tr>
                                    <td className="w-50">Symbol</td>
                                    <td>{sym}</td>
                                </tr>
                                <tr>
                                    <td className="w-50">Token Address</td>
                                    <td>{tokAddr}</td>
                                </tr>
                                <tr>
                                    <td className="w-50">Mint Authority</td>
                                    <td>{mint}</td>
                                </tr>
                                <tr>
                                    <td className="w-50">Freeze Authority</td>
                                    <td>{freeze}</td>
                                </tr>
                                <tr>
                                    <td className="w-50">Decimals</td>
                                    <td>{deci}</td>
                                </tr>
                                <tr>
                                    <td className="w-50">Current Supply</td>
                                    <td>{curSup}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
           </div> 
        </div>
     );
}
 
export default Details;