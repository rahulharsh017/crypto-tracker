import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //Dont get rid of this
import { callback } from "chart.js/helpers";
import { convertNumber } from "../../../functions/convertNumber";
import { type } from "@testing-library/user-event/dist/type";

function LineChart({ chartData,priceType, multiAxis }) {
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales:{
      crypto1:{
        type: "linear",
        display: true,
        position: "left",
        ticks:{
          callback: function(value, index, values) {
            if (priceType == "prices") return "$" + value.toLocaleString();
            else{
              return "$" + convertNumber(value);
            }
        },
      },
    },
    crypto2:{
      type: "linear",
      display: true,
      position: "right",
      ticks:{
        callback: function(value, index, values) {
          if (priceType == "prices") return "$" + value.toLocaleString();
          else{
            return "$" + convertNumber(value);
          }
      },
    },
  },
  },
};

  return <Line data={chartData} options={options} />;
}

export default LineChart;