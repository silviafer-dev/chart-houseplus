import { configureStore } from "@reduxjs/toolkit";
import mockDataReducer from "../features/chart/chartSlice";

export const store = configureStore({
  reducer: {
    data: mockDataReducer,
  },
});
