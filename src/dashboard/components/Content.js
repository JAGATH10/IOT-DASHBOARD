import React from "react";
import './Content.css';
import leafimage from './agrileafimage.png'
const Content = () => {
    return (
        <div className="content-container">
            <div className="text-content">
                <h1>Organize the agriculture<br/> with the power of IoT</h1>
                <p>Agriculture-related app with weather, soil moisture, <br/>intruder alert, livestock, and many other features.</p>
            </div>
            <div className="image-content">
                <img src={leafimage} alt="Your" height="600px" width="60%"/>
            </div>
        </div>
    )
}

export default Content;
