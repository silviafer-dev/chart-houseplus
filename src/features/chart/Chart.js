import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMockData, selectState } from "./chartSlice";

export const Chart = () => {
  const values = useSelector(selectState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMockData());
  }, [dispatch]);

//   console.log(values);

   if (!values.data) {
     return null;
   }

  return (
    <div>
      <div>Chart</div>
      <div>{values?.nomeLine}</div>
       {/* {values && values.data.map((el) => (
            <div key={el.mese}>
              <div>{el.mese}</div>
              <div>{el.valore}</div>
            </div>
          ))
        }  */}
    </div>
  );
};
