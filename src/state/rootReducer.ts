import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { VMsReducer } from "./slices/VMs/slice";

const VMsPersistConfig = {
  key: "VMs",
  storage,
};

export const rootReducer = combineReducers({
  VMs: persistReducer(VMsPersistConfig, VMsReducer),
});

export type RootStateType = ReturnType<typeof rootReducer>;
