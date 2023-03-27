import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
