import React from "react";
import './Soilmoisture.css';
import GreenSwitch from "../supportcomponents/GreenSwitch";
import graphimage from './graphsoilmoisture.png';
import Soilmoisturevalue from "../supportcomponents/Soilmoisturevalue";
const Soilmoisture = () =>{
    return (
        <div className="soilmoisture-container">
            <div className="soiltextswitch-container">
                <span>SoilMoisture Level</span>
                <GreenSwitch/>
            </div>
            <div className="Moisture-text">
             <span >Moisture on Today</span>
            </div>
            <p></p>
             <div className="soilvaluegraph-container">
                <div className="soilvalue"><Soilmoisturevalue/></div>
                <img src={graphimage} alt="graph" width="50%"/>
             </div>
        </div>
    )
}

export default Soilmoisture;