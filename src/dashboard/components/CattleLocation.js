import React,{useState,useEffect} from "react";
import './CattleLocation.css'
const CattleLocation = () =>{
    const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); 

    return () => clearInterval(interval);
  }, []); 

  const formattedDateTime = dateTime.toLocaleString(); // Customize date/time format if needed

    return (
        <div className="cattle-location-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.763008205838!2d77.27452747568589!3d11.497012588698995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9215d6d1b28f9%3A0xf48946a7dfcfeb1a!2sBannari%20Amman%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1700417575704!5m2!1sen!2sin" width="580" height="355" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="hello"></iframe>
            <div className="cattle-location-content">
                <h2>Cattle Location Status</h2>  
                 <p>Location Of the Cattle Founded at Satyamangalam</p>
                 <div className="cattle-location-htag">
                    <center><span>Last Location Details of the Cattle on {formattedDateTime}</span></center>
                 </div>
                 <p>Details:<br></br> Latitude:  11.49   Longitude: 77.2764</p>
            </div> 
        </div>
    )
}

export default CattleLocation;