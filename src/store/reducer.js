import { createSlice } from '@reduxjs/toolkit';
import moment from "moment"
const axios = require("axios");
const API_URL = "https://mmk-perf-api.herokuapp.com/metrics";

const initialState = {
  chartData: [],
  startDate: moment().subtract(30, 'minutes'),
  endDate: moment(),
  metricsData: [],
  resourcesLog: [],
  isWarning: false
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
    setWarning: (state, action) => {
      state.isWarning = action.payload
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload
    }
  }
});

export const getDataAsync = () => async (dispatch, getState) => {
  try {
    const { analytic } = getState()
    const response = await axios.get(API_URL, {
      
      params: {
        startDate: analytic.startDate["valueOf"](),
        endDate: analytic.endDate["valueOf"]()
      }
    });
    const data = response.data["metrics"]
    const resourcesLogData = JSON.parse(window.localStorage.getItem("metrics"))
    data.length === 0 && dispatch(setWarning(true))
    dispatch(getMetricsData(data))
    dispatch(getResourcesLog(resourcesLogData))
  } catch (err) {
    throw new Error(err);
  }
};

export const { getMetricsData, getResourcesLog, setStartDate, setEndDate, setWarning } = analyticSlice.actions;

export const selectCount = (state) => state.analytic.value;
export const dataSource = (state) => state.analytic.data;
export const metricsData = (state) => state.analytic.metricsData;
export const resourcesLog = (state) => state.analytic.resourcesLog;
export const startDt = (state) => state.analytic.startDate;
export const endDt = (state) => state.analytic.endDate;
export const isWarning = (state) => state.analytic.isWarning

export default analyticSlice.reducer;
