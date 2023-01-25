import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchMockData, selectState } from "../features/chart/chartSlice";
import open from "../assets/svg/open.svg";
import { Modal } from "./Modal";

export const ChartLine = () => {
  const values = useSelector(selectState);
  const [isOpen, setIsOpen] = useState(false);
  const [dataTool, setDataTool] = useState({});

  const openM = () => {
    setIsOpen(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMockData());
  }, [dispatch]);

  if (!values.data) return null;

  const series = [
    {
      name: values.nomeLine,
      data: values.data.map((el) => ({
        x: el.mese,
        y: el.valore,
      })),
    },
  ];
  const options = {
    chart: {
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
    markers: {
      size: 4,
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: true,
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        let name = values.nomeLine;
        let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        setDataTool(data);

        let customTooltip = document.getElementById("custom-tooltip");
        const button = document.createElement("button");
        button.classList = "button-tooltip";
        button.innerHTML = `
        <script></script>
        <img src="${open}" alt="open-icon" width=20px color="white"/>Apri`;

        if (!customTooltip) {
          customTooltip = document.createElement("div");
          customTooltip.id = "custom-tooltip";

          customTooltip.innerHTML = `<div class="name-month">
          ${data.x}
          </div>
          <div>
          <span style="color: #008FFB;"> ● </span>
          ${name}:
          ${data.y}
          </div>`;
          button.addEventListener("click", openM);
          customTooltip.appendChild(button);
        } else {
          customTooltip.innerHTML = `<div class="name-month">
          ${data.x}
          </div>
          <div>
          <span style="color: #008FFB;"> ● </span>
          ${name}:
          ${data.y}
          </div>`;
          button.addEventListener("click", openM);
          customTooltip.appendChild(button);
        }

        return customTooltip.outerHTML;
        // `<div><div class="name-month">
        //   ${data.x}
        //   </div>
        //   <div>
        //   <span style="color: #008FFB;"> ● </span><span>
        //   ${name}:
        //   ${data.y}
        //   </div>
        //   </div>
        //   <button class="button-tooltip" onclick=${console.log("Hello")}>
        //   <img src=${open} alt="open-icon" width=20px color="white"/>
        //    Apri </button>`;
      },
      events: {
        click: true,
      },
      // events: {
      //   click: function (event, chartContext, config) {
      //     // console.log(config.config.series[config.seriesIndex]);
      //     console.log(config.config.series[config.seriesIndex].name);
      //     console.log(
      //       config.config.series[config.seriesIndex].data[config.dataPointIndex]
      //     );
      //   },
      // },
      fillSeriesColor: false,
      theme: "light",
    },
  };

  return (
    <div className="container">
      <Modal
        open={isOpen}
        close={() => setIsOpen(false)}
        data={dataTool}
        values={values}
      >
        Contenido del modal
      </Modal>
      <Chart
        options={options}
        series={series}
        type="line"
        width="600"
        height="500"
      />
      <button onClick={() => setIsOpen(true)}>Button</button>
    </div>
  );
};
