import {useAppDispatch, useAppSelector} from '../store';
import {
  selectEventsData,
  selectEventsLoading,
  setData,
  setLoading,
} from '../store/slices/eventsSlice';
import {useCallback} from 'react';
import getEvents from '../api/getEvents';

const useEventsFetch = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectEventsData);
  const loading = useAppSelector(selectEventsLoading);

  const fetch = useCallback(() => {
    console.log('fetch start');

    dispatch(setLoading(true));

    return getEvents({per_page: 25})
      .then(response => {
        if (response.status === 200) {
          dispatch(setData(response.data));
        } else {
          dispatch(setData([]));
        }
      })
      .catch((reason: Error) => {
        console.error('getEvents error', reason);
        dispatch(setData([]));
      })
      .finally(() => {
        dispatch(setLoading(false));
        console.log('fetch end');
      });
  }, [dispatch]);

  return {
    data,
    loading,
    fetch,
  };
};

export default useEventsFetch;
