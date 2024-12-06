import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useRef} from 'react';

function useRefreshOnFocus(refetch: () => void) {
  const enabledRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) {
        refetch();
      } else {
        enabledRef.current = true;
      }
    }, [refetch]),
  );
}

export default useRefreshOnFocus;
