import React from "react"
import { Doughnut } from "react-chartjs-2"
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const DountChart = ({dataColors}) => {
  var doughnutChartColors =  getChartColorsArray(dataColors); 
  const data = {
    labels: ["Worked", "Pending"],
    datasets: [
      {
        data: [30, 10],
        backgroundColor: doughnutChartColors,
        hoverBackgroundColor: doughnutChartColors,
        hoverBorderColor: "#fff",
      },
    ],
  }

  return <Doughnut width={734} height={269} className="chartjs-chart" data={data} />
}

export default DountChart;
