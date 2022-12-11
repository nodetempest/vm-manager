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

    deleteVMs(state, action: PayloadAction<string | string[]>) {
      state = omit(state, [action.payload].flat());
    },
  },
});

export const { addVM, deleteVMs } = VMsSlice.actions;

export const VMsReducer = VMsSlice.reducer;
