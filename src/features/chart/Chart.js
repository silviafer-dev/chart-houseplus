import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMockData, selectState } from "./chartSlice";

export const Chart = () => {
  const data = useSelector(selectState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMockData());
  }, [dispatch]);

  console.log(data);
  return <div>Chart</div>;
};
