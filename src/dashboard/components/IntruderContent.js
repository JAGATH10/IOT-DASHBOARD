import React from "react";
import LiveDateTime from "../supportcomponents/LiveTimeDate";
import './IntruderContent.css'
import LastCapturedImages from "../supportcomponents/LastCapturedImage";
import ClarifaiMultipleResponse from "../supportcomponents/ClarifaiMultipleResponses";
const IntruderContent = () =>{
    return (
        <div>
          <div className="intruder-time">
                <h3>Intruder Status Today &emsp;</h3>
                <LiveDateTime className="ptag"/>
                
          </div>
          <LastCapturedImages/>
          <ClarifaiMultipleResponse/>
        </div>

    )
}

export default IntruderContent;