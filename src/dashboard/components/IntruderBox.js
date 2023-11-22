import React from "react";
import IntruderContent from "./IntruderContent";
import './IntruderBox.css'
const IntruderBox = () =>{
    return (
        <div className="intruder-container">
            <div className="intruder-flexcontainer">
                <IntruderContent/>
            </div>
        </div>
    )
}

export default IntruderBox;