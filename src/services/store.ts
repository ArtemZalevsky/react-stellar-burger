import { rootReducer } from "./reducers/root-reducer";

import {
  connect,
  disconnect,
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting
} from "./actions/actions-ws";
import { socketMiddleware } from "./middleware/socket-middleware";
import { configureStore } from "@reduxjs/toolkit";

export const ordersMiddleware = socketMiddleware({
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onMessage: wsMessage,
  onClose: wsClose,
  onError: wsError,
});

export const ordersProfileMiddleware = socketMiddleware({
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onMessage: wsMessage,
  onClose: wsClose,
  onError: wsError,
});

export const initStore = configureStore({
  reducer: {
    rootReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ordersMiddleware,
      ordersProfileMiddleware
    );
  },
});
