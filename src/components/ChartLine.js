import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchMockData, selectState } from "../features/chart/chartSlice";
import open from "../assets/svg/open.svg";
import { Modal } from "./Modal";
import "../css/chartLine.css";

export const ChartLine = () => {
  const values = useSelector(selectState);
  const [isOpen, setIsOpen] = useState(false);
  const [dataTool, setDataTool] = useState({});

  const dispatch = useDispatch();
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    dispatch(fetchMockData());
  }, [dispatch]);

  if (!values.data) return null;
  const button = document.createElement("button");
  button.classList = "button-tooltip";
  button.innerHTML = `
        <img src="${open}" alt="open-icon" width=20px color="white" />Apri`;
  button.onclick = function () {
    console.log("firrr");
    // setIsOpen(true);
  };

  // const div = document.createElement("div");
  // div.innerHTML = `<button class="button-tooltip" onclick="
  //  ${() => setIsOpen(true)}"><img src=${open} alt="open-icon" width=20px color="white"/>Apri</button>`;

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
      height: 450,
      type: "line",
      zoom: {
        enabled: true,
      },
      width: "100%",
      xaxis: {
        type: "category",
      },
      events: {
        click: function () {
          setIsOpen(true);
        },
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
    },
    title: {
      text: "Grafico mese/valore",
      align: "left",
    },

    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
    },

    tooltip: {
      enabled: true,
      shared: false,
      followCursor: true,
      intersect: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        let name = values.nomeLine;
        let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        setDataTool(data);

        let customTooltip = document.getElementById("custom-tooltip");

        if (!customTooltip) {
          customTooltip = document.createElement("div");
          customTooltip.id = "custom-tooltip";
          customTooltip.innerHTML = `
          <div>
          <div class="name-month">
          ${data.x}
          </div>
          <div class="value-month">
          <span style="color: #008FFB;"> ● </span>
          ${name}:
          ${data.y}
          </div>
          </div>
          `;
          // <button class="button-tooltip" onclick="console.log('Hello')"><img src="${open}" alt="open-icon" width=20px color="white" />Apri
          // </button>

          customTooltip.appendChild(button);
        } else {
          customTooltip.innerHTML = `
          <div class="name-month">
          ${data.x}
          </div>
          <div class="value-month">
          <span style="color: #008FFB;"> ● </span>
          ${name}:
          ${data.y}
          </div>
          
          `;
          // <button class="button-tooltip" onclick="console.log('Hello')"><img src="${open}" alt="open-icon" width=20px color="white" />Apri
          // </button>

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

      //
      fillSeriesColor: false,
      theme: "light",
    },
  };

  return (
    <div className="container-chart">
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
