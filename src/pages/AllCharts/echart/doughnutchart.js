import React from "react";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const Doughnut = ({dataColors}) => {

const today=new Date()
const startDate=new Date(today.getFullYear(),today.getMonth(),1,0,0,0,0)
const endDate=new Date(today.getFullYear(),today.getMonth()+1,0,23,59,59,59)
let count=0;
while(startDate<=endDate){
  const Day=startDate.getDay()
  if(Day!==5 && Day!==6){
  count++;
  }
  startDate.setDate(startDate.getDate()+1);
}
const tothrs=count*8;

  const doughnutEChartColors = getChartColorsArray(dataColors);

  const options = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      x: "left",
      data: ["Worked","Pending"],
      textStyle: {
        color: ["#8791af"],
      },
    },
    color: ["#3B71CA","#ffc107"],
    series: [
      {
        name:` Total hours : ${tothrs}`,
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center",
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "20",
              fontWeight: "bold",
            },
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          { value: 120, name: "Worked" },
          { value: 48, name: "Pending" },
          // { value: 234, name: "Mobile" },
          // { value: 135, name: "Others" },
          // { value: 1548, name: "Desktop" },
        ],
        option:{
          devicePixelRatio:4
        }
      },
    ],
  }

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "250px" }} option={options} />
    </React.Fragment>
  );
};
export default Doughnut;