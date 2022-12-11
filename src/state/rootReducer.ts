import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { VMsReducer } from "./slices/VMs/slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const combinedReducer = combineReducers({
  VMs: VMsReducer,
});

export const rootReducer = persistReducer(persistConfig, combinedReducer);

export type RootStateType = ReturnType<typeof rootReducer>;
