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

export type TVMsRecord = Record<string, TVM>;

export type TVMsState = {
  VMsRecord: TVMsRecord;
};

const initialState: TVMsState = {
  VMsRecord: {},
};

const VMsSlice = createSlice({
  name: "VMs",
  initialState,
  reducers: {
    addVM(state, action: PayloadAction<Omit<TVM, "id">>) {
      const id = nanoid();
      state.VMsRecord[id] = { ...action.payload, id };
    },

    deleteVMs(state, action: PayloadAction<string[]>) {
      state.VMsRecord = omit(state.VMsRecord, action.payload);
    },

    togglePower(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.VMsRecord[id].power = !state.VMsRecord[id].power;
    },
  },
});

export const { addVM, deleteVMs, togglePower } = VMsSlice.actions;

export const VMsReducer = VMsSlice.reducer;
