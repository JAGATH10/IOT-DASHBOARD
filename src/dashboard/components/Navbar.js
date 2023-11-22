import React from "react";
import './Navbar.css';
import PanoramaFishEyeRoundedIcon from '@mui/icons-material/PanoramaFishEyeRounded';
const Navbar = () => {
    return (
        <div>
           <nav className="navbar">
            <div className="navbar-container">
             <div className="navbar-title">
                <p>Agro Hub</p>
             </div>
             <div className="navbar-user">
                <button>API Integrations</button>
                <span>Jagath D</span>
                <PanoramaFishEyeRoundedIcon/>
             </div>
             </div>
           </nav>
          
        </div>
    )
}
export default Navbar;