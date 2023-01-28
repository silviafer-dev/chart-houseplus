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

  useEffect(() => {
    dispatch(fetchMockData());
  }, [dispatch]);

  if (!values.data) return null;
  const button = document.createElement("button");
  button.classList = "button-tooltip";
  button.innerHTML = `
        <img src="${open}" alt="open-icon" width=20px color="white" />Apri`;
  button.onclick = function () {
    setIsOpen(true);
  };

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
        markerClick: function () {
          setIsOpen(true);
        },
      },
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

          customTooltip.appendChild(button);
        }

        return customTooltip.outerHTML;
      },

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
      />
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
