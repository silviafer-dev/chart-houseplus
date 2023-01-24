
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
      id: "basic-line",
    },
    xaxis: {
      type: "category",
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
