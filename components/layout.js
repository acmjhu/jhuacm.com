import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import {
  LoginIcon,
  LogoutIcon,
  DotsVerticalIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Link, MenuPopup } from '.';
import { userService } from '../services';
import { useClickout } from '../lib/hooks';

const About = ({ path = '' }) => (
  <Link
    href='/about'
    className={clsx('transition duration-200 ease-in-out hover:text-sky-500', {
      'text-gray-500 pointer-events-none': path === '/about',
    })}
  >
    About
  </Link>
);

const Events = ({ path = '' }) => (
  <Link
    href='/events'
    className={clsx('transition duration-200 ease-in-out hover:text-sky-500', {
      'text-gray-500 pointer-events-none': path === '/events',
    })}
  >
    Events
  </Link>
);

const Join = ({ path = '' }) => (
  <Link
    href='/join'
    className={clsx('transition duration-200 ease-in-out hover:text-sky-500', {
      'text-gray-500 pointer-events-none': path === '/join',
    })}
  >
    Join
  </Link>
);

const Login = () => (
  <div className='flex items-center'>
    <Link
      href='/login'
      className='w-full transition duration-200 ease-in-out hover:text-sky-500'
    >
      <div className='flex items-center gap-[2px] w-full justify-between'>
        <p>Admin</p>
        <LoginIcon className='w-5 h-5' />
      </div>
    </Link>
  </div>
);

const Logout = ({ router }) => (
  <div className='flex items-center'>
    <div
      onClick={() => {
        userService.logout();
        router.reload();
      }}
      className='w-full transition duration-200 ease-in-out hover:cursor-pointer hover:text-sky-500'
    >
      <div className='flex items-center gap-[2px] justify-between w-full'>
        <p>Logout</p>
        <LogoutIcon className='w-5 h-5' />
      </div>
    </div>
  </div>
);

export const Layout = ({ children, landing }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);
  const [hit, setHit] = useClickout(ref);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const privatePath = [/\/events\/create/, /\/events\/edit\/[a-z0-9 ]/];
    const path = url.split('?')[0];
    if (
      !userService.user &&
      privatePath.reduce((acc, regex) => acc || regex.test(path), false)
    ) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      {showMenu && (
        <div
          className={clsx(
            'absolute z-10 w-full h-full bg-zinc-200/50 sm:hidden backdrop-blur-sm'
          )}
        />
      )}
      <MenuPopup
        innerRef={ref}
        show={showMenu}
        setShow={setShowMenu}
        hit={hit}
        setHit={setHit}
      >
        <XIcon
          className='absolute flex items-center justify-center w-5 h-5 text-gray-500 top-[1.15rem] right-4 hover:text-gray-600'
          onClick={() => setShowMenu(false)}
        />
        <div className='divide-y'>
          <div className='flex flex-col justify-between gap-3 pb-2'>
            <About path={router.pathname} />
            <Events path={router.pathname} />
            <Join path={router.pathname} />
          </div>
          <div className='pt-2'>
            {!userService.user ? <Login /> : <Logout router={router} />}
          </div>
        </div>
      </MenuPopup>
      <div
        className={clsx('mx-auto min-w-[150px] w-full h-full', {
          'fixed overflow-hidden pointer-events-none': showMenu,
        })}
      >
        <div
          className={clsx(
            'flex items-center w-full px-6 h-11 backdrop-blur-sm bg-white/60 sm:sticky top-0 overflow-y-auto justify-between',
            {
              'border-b': !landing,
            }
          )}
        >
          <div className='mr-8 font-serif text-lg'>
            <Link href='/'>JHU ACM</Link>
          </div>
          <DotsVerticalIcon
            className='w-5 h-5 sm:hidden'
            onClick={() => setShowMenu(true)}
          />
          <div className='hidden gap-4 font-medium text-gray-700 sm:flex'>
            <About />
            <Events />
            <Join />
            {!userService.user ? <Login /> : <Logout router={router} />}
          </div>
        </div>
        {authorized && (
          <div
            className={clsx('w-full flex flex-col items-center px-6', {
              'h-frame_landing justify-center': landing,
              'pt-6 pb-4': !landing,
            })}
          >
            <div
              className={clsx('w-full h-full', {
                'max-w-[750px] pb-6': !landing,
                'flex justify-center items-center': landing,
              })}
            >
              {children}
            </div>
            {!landing && (
              <div className='max-w-[750px] w-full'>
                <button
                  onClick={() => router.back()}
                  className='transition-colors duration-200 ease-in-out hover:text-sky-500'
                >
                  ← Back{' '}
                </button>
              </div>
            )}
          </div>
        )}
        <div className='fixed bottom-0 hidden pb-1 pl-2 text-sm text-gray-500 md:flex'>
          JHU ACM © {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
};
