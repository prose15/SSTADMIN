import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const Leaveapaexlinecolumn = ({taken,available,dataColors}) => {
  const apaexlineColumnColors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "Taken",
      data: [taken[0],taken[1],taken[2],taken[3],taken[4],taken[5],taken[6],taken[7],taken[8],taken[9],taken[10],taken[11]],
    },
    {
      name: "Available",
      data: [available[0],available[1],available[2],available[3],available[4],available[5],available[6],available[7],available[8],available[9],available[10],available[11]],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    colors: apaexlineColumnColors,
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
    },
    yaxis: {
      title: {
        text: "Days",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return  val + " Days";
        },
      },
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};

export default Leaveapaexlinecolumn;