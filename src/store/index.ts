import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {eventsSlice} from './slices/eventsSlice';

const store = configureStore({
  reducer: {
    events: eventsSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const getAppState = store.getState;
export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface AsyncAppThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
}
