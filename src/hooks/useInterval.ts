import {MutableRefObject, useEffect, useRef} from 'react';

const useInterval = (callback: Function, delay: number | null) => {
  const savedCallback = useRef() as MutableRefObject<Function>;

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      console.log('useInterval tick');
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
