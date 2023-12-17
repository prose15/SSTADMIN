import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "components/Common/ChartsDynamicColor";

const Leaveapaexlinecolumn = ({dataColors}) => {
  const apaexlineColumnColors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "Total",
      data: [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5],
    },
    {
      name: "Booked",
      data: [2,1,3,2,1,3,4,2,1,3,2,3],
    },
    {
      name: "Available",
      data: [1,3,2,4,3,2,1,2,3,4,2,1],
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