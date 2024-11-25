import { configureStore } from "@reduxjs/toolkit";

import { default as cartReducer } from "./slices/cart";
import { apiSlice } from "./slices/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
