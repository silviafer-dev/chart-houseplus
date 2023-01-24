import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchMockData, selectState } from "../features/chart/chartSlice";

export const ChartLine = () => {
  const values = useSelector(selectState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMockData());
  }, [dispatch]);

  if (!values.data) return null;

  const series = [
    {
      name: values.nomeLine,
      data: values.data.map((el) => ({ x: el.mese, y: el.valore })),
    },
  ];
  const options = {
    chart: {
      events: {
        dataPointMouseEnter: true,
        click(event, chartContext, config) {
          // console.log(config.config.series[config.seriesIndex]);
          console.log(config.config.series[config.seriesIndex].name);
          console.log(
            config.config.series[config.seriesIndex].data[config.dataPointIndex]
          );
        },
      },
      xaxis: {
        type: "category",
      },
    },
    title: {
      text: "Page data",
      align: "left",
    },

    dataLabels: {
      enabled: false,
      offsetY: 0,
      style: {
        fontSize: "20px",
        colors: ["#d3d3d3"],
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: true,
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        let name = values.nomeLine;
        let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

        return `<div><div class="name-month"> 
          ${data.x}
          </div>
          <div>
          ${name}
          : 
          ${data.y}
          </div></div>
          <button class="button-tooltip"> Apri </button>
          </div>`;
      },
      fillSeriesColor: false,
      theme: "light",
    },
  };

  return (
    <div>
      <div>Chart</div>
      <Chart
        options={options}
        series={series}
        type="line"
        width="600"
        height="500"
      />
    </div>
  );
};
