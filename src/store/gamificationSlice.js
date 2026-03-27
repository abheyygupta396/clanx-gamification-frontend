import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enabled: false,
  config: {
    event: "",
    eventValue: "",
    reward: "",
    rewardValue: "",
    isTimeBound: false,
    endDate: null,
  },
};

const gamificationSlice = createSlice({
  name: "gamification",
  initialState,
  reducers: {
    toggleGamification: (state) => {
      state.enabled = !state.enabled;
    },

    setEvent: (state, action) => {
      state.config.event = action.payload;
    },

    setEventValue: (state, action) => {
      state.config.eventValue = action.payload;
    },

    setReward: (state, action) => {
      state.config.reward = action.payload;
    },

    setRewardValue: (state, action) => {
      state.config.rewardValue = action.payload;
    },

    setTimeBound: (state, action) => {
      state.config.isTimeBound = action.payload;
    },

    setEndDate: (state, action) => {
      state.config.endDate = action.payload;
    },
  },
});

export const {
  toggleGamification,
  setEvent,
  setEventValue,
  setReward,
  setRewardValue,
  setTimeBound,
  setEndDate,
} = gamificationSlice.actions;

export default gamificationSlice.reducer;