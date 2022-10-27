import { Link } from "react-router-dom";
import github from "./resources/images/GitHub-logo.gif";
const NavBarComponent = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top our-navbar">
                <div className="container-fluid">
                    <a id="hide-on-lg" className="navbar-brand" href="/">SHYFT</a>
                    
                    
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                    <div className='container-fluid'>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav w-100">
                                {/* <li className="nav-item">
                                    <a id="hide-on-md" className="navbar-brand" href="/"><img src={logo} style={{ width: "80px" }} alt="Shyft" /></a>
                                </li> */}
                                
                                <li className="nav-item icons-menu">
                                    <Link className="mx-3 pt-1" to="/membership">subscribe</Link>
                                    <Link className="mx-3 pt-1" to="/login">login</Link>
                                    <a className="highlight mx-3" href="https://shyft.to/get-api-key" target="_blank" rel="noreferrer">Get API key</a>
                                    {/* <a className="btn-solid-grad-xs-2 mx-3" href="https://shyft.to/get-api-key" target="_blank" rel="noreferrer">Get API key</a> */}
                                    <a type="button" className="btn btn-link px-2" href="https://github.com/Shyft-to/example-projects/tree/main/example-projects-on-NFTs/membership_nfts" target="_blank" rel="noreferrer"> <img className="github-icon" src={github} alt="Github Repo" /> </a>
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
          </nav>
    </div>
  );
};

export default NavBarComponent;
