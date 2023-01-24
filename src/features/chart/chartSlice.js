import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uri = "https://api-houseplus-test.herokuapp.com/testDev/mockdata";

const initialState = {
  mockData: [],
  status: "idle",
  error: null,
};

export const fetchMockData = createAsyncThunk("get/fetchMockData", async () => {
  const response = await axios.get(uri);
  return response.data;
});

const mockDataSlice = createSlice({
  name: "mockData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMockData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMockData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mockData = state.mockData.concat(action.payload);
      })
      .addCase(fetchMockData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default mockDataSlice.reducer;
export const selectState = (state) => state.data.mockData;
