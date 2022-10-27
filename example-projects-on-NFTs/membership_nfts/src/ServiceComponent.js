import item1 from './resources/market-images/contra.gif';
import item2 from './resources/market-images/bear.gif';
import item3 from './resources/market-images/cat.gif';
import item4 from './resources/market-images/funny.gif';
import item5 from './resources/market-images/pizza-pizza-time.gif';
import item6 from './resources/market-images/thanos.gif';

import {ReactSession} from 'react-client-session';
import { useEffect, useState } from 'react';

const ServiceComponent = () => {
    const [discount,setDiscount] = useState(0);
    const [subname,setSubname] = useState("None");
    const [activ,setActiv] = useState(false);
    
    useEffect(() => {
        var name = ReactSession.get("subs_name") ?? "";
        var dis = Number(ReactSession.get("subs_discount") ?? 0);
        var actv = ReactSession.get("subs_actv") ?? false;
        console.log(dis)
        setDiscount(dis);
        setSubname(name);
        setActiv(actv);
    }, [])
    

    
    return ( 
        <div>
            <div className="background-1">
                <div className="container-xl">
                    <h2 className="main-heading text-center">Hearthstore</h2>
                    <h4 className="sub-heading mb-5 text-center">Just another fantasy marketplace for your 8-bit needs.</h4>
                    {activ && 
                        <p className='bit-lead my-4'>
                            Your Current Active Subscription: {subname}
                        </p>
                    }
                    <div className="card-section py-5 w-75 mx-auto">
                        <div className="row">
                            <div className="col-md-12 col-lg-4">
                                <div className="card bg-dark p-1 my-2 rounded-3 border-light mx-auto" style={{width:"250px"}}>
                                    <img className="card-img-top" src={item1} alt="Card small" style={{width:"100%"}} />
                                    <div className="card-body">
                                        <h4 className="card-title text-light cfont">Contra Gun</h4>
                                        <p className="card-text text-light cfont">$ {10 - ((discount/100)*10)} {(discount !== 0) && <span className='text-info'>-{discount}% off</span>}</p>
                                        <button className="btn btn-light py-0 px-3 rounded-pill cfont">Buy</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <div className="card bg-dark p-1 my-2 rounded-3 border-light mx-auto" style={{width:"250px"}}>
                                    <img className="card-img-top" src={item2} alt="Card mid" style={{width:"100%"}} />
                                    <div className="card-body">
                                        <h4 className="card-title text-light cfont">Bear Punch</h4>
                                        <p className="card-text text-light cfont">$ {20 - ((discount/100)*20)} {(discount !== 0) && <span className='text-info'>-{discount}% off</span>}</p>
                                        <button className="btn btn-light py-0 px-3 rounded-pill cfont">Buy</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <div className="card bg-dark p-1 my-2 rounded-3 border-light mx-auto" style={{width:"250px"}}>
                                    <img className="card-img-top" src={item3} alt="Card big" style={{width:"100%"}} />
                                    <div className="card-body">
                                        <h4 className="card-title text-light cfont">Smelly Cat</h4>
                                        <p className="card-text text-light cfont">$ {22 - ((discount/100)*22)} {(discount !== 0) && <span className='text-info'>-{discount}% off</span>}</p>
                                        <button className="btn btn-light py-0 px-3 rounded-pill cfont">Buy</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <div className="card bg-dark p-1 my-2 rounded-3 border-light mx-auto" style={{width:"250px"}}>
                                    <img className="card-img-top" src={item4} alt="Card small" style={{width:"100%"}} />
                                    <div className="card-body">
                                        <h4 className="card-title text-light cfont">Dork Duck</h4>
                                        <p className="card-text text-light cfont">$ {12 - ((discount/100)*12)} {(discount !== 0) && <span className='text-info'>-{discount}% off</span>}</p>
                                        <button className="btn btn-light py-0 px-3 rounded-pill cfont">Buy</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <div className="card bg-dark p-1 my-2 rounded-3 border-light mx-auto" style={{width:"250px"}}>
                                    <img className="card-img-top" src={item5} alt="Card mid" style={{width:"100%"}} />
                                    <div className="card-body">
                                        <h4 className="card-title text-light cfont">Party Pizza</h4>
                                        <p className="card-text text-light cfont">$ {26 - ((discount/100)*26)} {(discount !== 0) && <span className='text-info'>-{discount}% off</span>}</p>
                                        <button className="btn btn-light py-0 px-3 rounded-pill cfont">Buy</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <div className="card bg-dark p-1 my-2 rounded-3 border-light mx-auto" style={{width:"250px"}}>
                                    <img className="card-img-top" src={item6} alt="Card big" style={{width:"100%"}} />
                                    <div className="card-body">
                                        <h4 className="card-title text-light cfont">Shine Stone</h4>
                                        <p className="card-text text-light cfont">$ {30 - ((discount/100)*30)} {(discount !== 0) && <span className='text-info'>-{discount}% off</span>}</p>
                                        <button className="btn btn-light py-0 px-3 rounded-pill cfont">Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ServiceComponent;