
import React from "react";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import SoilForecast from "../components/SoilForecast";
import IntruderBox from "../components/IntruderBox";
import CattleLocation from "../components/CattleLocation";
import SoilMoistureChart from "../supportcomponents/SoilmoistureChart";
import HumidityChart from "../supportcomponents/HumidityChart";
import TemperatureChart from "../supportcomponents/TemperatureChart"
const Dashboard = ( ) => {
  return(
  <div>
     <Navbar/>
     <Content/>
     <SoilForecast/>
     <IntruderBox/>
     <CattleLocation/>
     <SoilMoistureChart/>
     <HumidityChart/>
     <TemperatureChart/>
  </div>
  )
}
export default Dashboard;