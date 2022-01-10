import { useEffect } from 'react';
import clsx from 'clsx';

export const MenuPopup = ({
  innerRef,
  show,
  setShow,
  hit,
  setHit,
  children,
}) => {
  useEffect(() => {
    if (hit) {
      setHit(false);
      setShow(false);
    }
  }, [hit]);

  return (
    <div
      ref={innerRef}
      className={clsx(
        'z-50 fixed sm:hidden w-full max-w-[200px] p-4 text-base font-semibold text-gray-900 bg-white rounded-lg shadow-lg top-2 right-2',
        { hidden: !show || hit }
      )}
    >
      {children}
    </div>
  );
};
