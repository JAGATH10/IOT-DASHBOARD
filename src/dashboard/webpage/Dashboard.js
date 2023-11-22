
import React from "react";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import SoilForecast from "../components/SoilForecast";
import IntruderBox from "../components/IntruderBox";
import CattleLocation from "../components/CattleLocation";
const Dashboard = ( ) => {
  return(
  <div>
     <Navbar/>
     <Content/>
     <SoilForecast/>
     <IntruderBox/>
     <CattleLocation/>
  </div>
  )
}
export default Dashboard;