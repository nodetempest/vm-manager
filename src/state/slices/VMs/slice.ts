import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import omit from "lodash/omit";

export type TVM = {
  VMName: string;
  procType: "intel" | "celeron" | "xeon";
  IP: string;
  repository: string;
  power: boolean;
  id: string;
};

export type TVMs = Record<string, TVM>;

const initialState: TVMs = {};

const VMsSlice = createSlice({
  name: "VMs",
  initialState,
  reducers: {
    addVM(state, action: PayloadAction<Omit<TVM, "id">>) {
      const id = nanoid();
      state[id] = { ...action.payload, id };
    },

    deleteVMs(state, action: PayloadAction<string[]>) {
      action.payload.forEach((id) => delete state[id]);
    },

    togglePower(state, action: PayloadAction<string>) {
      const id = action.payload;
      state[id].power = !state[id].power;
    },
  },
});

export const { addVM, deleteVMs, togglePower } = VMsSlice.actions;

export const VMsReducer = VMsSlice.reducer;
