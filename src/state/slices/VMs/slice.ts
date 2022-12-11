import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import omit from "lodash/omit";

export type TVM = {
  VMName: string;
  procType: "intel" | "celeron" | "xeon";
  IP: string;
  repository: string;
  power: boolean;
};

export type TVMs = Record<string, TVM>;

const initialState: TVMs = {};

const VMsSlice = createSlice({
  name: "VMs",
  initialState,
  reducers: {
    addVM(state, action: PayloadAction<TVM>) {
      state[nanoid()] = action.payload;
    },

    deleteVMs(state, action: PayloadAction<string[]>) {
      state = omit(state, action.payload);
    },
  },
});

export const { addVM, deleteVMs } = VMsSlice.actions;

export const { reducer: VMsReducer } = VMsSlice;
