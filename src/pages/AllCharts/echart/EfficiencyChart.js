import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";
import { CardBody, Card } from "reactstrap";
import { useStateContext } from "Context/ContextProvider";
import { totHours } from "./totHoursPerMonth";
const EfficiencyChart = ({dataColors}) => {
    const {project,performanceArray,format}=useStateContext()
    let totalHours
    if(format==='monthly'){
       totalHours=totHours()
    }else{
      totalHours=40
    }
  const doughnutEChartColors = getChartColorsArray(dataColors);
  let chartData=[totalHours]
  
  for(var i=0;i<performanceArray.length;i++){
    chartData.push(performanceArray[i])
  }
 
let projectName=['TOTAL']
    project.map((data)=>{
        projectName.push(data.service)
    })
    
  var doughnutChartColors =  getChartColorsArray(dataColors); 
  const data = {
    labels: projectName,
    datasets: [
      {
        data: chartData,
        backgroundColor: doughnutChartColors,
        hoverBackgroundColor: doughnutChartColors,
        hoverBorderColor: "#fff",
      },
    ],
  }

  return(
    <Card >
        <div className="m-3"
        ><h4 className="font-size-16 mb-3">Monthly Performance</h4></div>
        <CardBody>
<Doughnut width={734} height={269} className="chartjs-chart" data={data} />
        </CardBody>
    </Card>
    
  ) 
}
export default EfficiencyChart;