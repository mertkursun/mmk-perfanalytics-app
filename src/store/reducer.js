import { createSlice } from '@reduxjs/toolkit';
import moment from "moment"
const axios = require("axios");
const API_URL = "https://mmk-perf-api.herokuapp.com/metrics";

const initialState = {
  chartData: [],
  startDate: 0,
  endDate: 0,
  metricsData: [],
  resourcesLog: []
};

export const analyticSlice = createSlice({
  name: 'analytic',
  initialState,
  reducers: {
    getMetricsData: (state, action) => {
      const metricsLog = action.payload.map((obj, index) => {
        return {
          ...obj,
          key: index,
          date: moment(obj.date).format("DD/MM/YYYY HH:mm:ss")
        }
      })
      state.metricsData = metricsLog
    },
    getResourcesLog: (state, action) => {
      state.resourcesLog = action.payload
    },
    startDate: (state, action) => {
      state.startDate = action.payload
    },
    endDate: (state, action) => {
      state.endDate = action.payload
    }
  }
});

export const getDataAsync = () => async (dispatch, getState) => {
  try {
    const { analytic } = getState()
    const response = await axios.get(API_URL, {
      params: {
        startDate: analytic.startDate,
        endDate: analytic.endDate
      }
    });
    const data = response.data["metrics"]
    const resourcesLogData = JSON.parse(window.localStorage.getItem("metrics"))

    dispatch(getMetricsData(data))
    dispatch(getResourcesLog(resourcesLogData))
  } catch (err) {
    throw new Error(err);
  }
};

export const { getMetricsData, getResourcesLog, startDate, endDate } = analyticSlice.actions;

export const selectCount = (state) => state.analytic.value;
export const dataSource = (state) => state.analytic.data;
export const metricsData = (state) => state.analytic.metricsData;
export const resourcesLog = (state) => state.analytic.resourcesLog;

export default analyticSlice.reducer;
