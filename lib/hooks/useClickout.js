import { useEffect, useState } from 'react';

const useClickout = (ref) => {
  const [hit, setHit] = useState(false);

  useEffect(() => {
    const handleClickout = (e) => {
      if (ref.current) {
        if (!ref.current.contains(e.target)) setHit(true);
        else setHit(false);
      }
    };
    document.addEventListener('mousedown', handleClickout);
    return () => document.removeEventListener('mousedown', handleClickout);
  }, [ref]);

  return [hit, setHit];
};

export { useClickout };
