import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../index';
import {EventsData} from '../../api/getEvents';

interface EventsState {
  data: EventsData;
  loading: boolean;
}

const initialState: EventsState = {
  data: [],
  loading: false,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<EventsData>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setData, setLoading} = eventsSlice.actions;

export const selectEventsData = (state: RootState) => state.events.data;
export const selectEventsLoading = (state: RootState) => state.events.loading;

export const selectParam = <T extends unknown>(_: unknown, param: T) => param;

export const selectDataItemById = (id: string) => (state: RootState) => {
  return createSelector(
    [selectEventsData, selectParam<string>],
    (data, itemId) => data.find(item => item.id === itemId) || null,
  )(state, id);
};
