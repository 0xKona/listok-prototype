//This custom hook is used for closing a modal for example if clicked outside

// Props:

//   ->  ref: this is your useRef for the Component
//   ->  callback: this the function you want to execute when user clicks outside of the useRef

import { useEffect } from 'react';
//TODO : Update Types
const useOutsideClick = (ref: any, callback: any) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
