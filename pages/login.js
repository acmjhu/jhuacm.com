import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { userService } from '../services';
import { Input } from '../components';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      setLoading(true);
      try {
        await userService.login(username, password);
        setLoading(false);
        router.reload();
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    },
  });

  useEffect(() => {
    if (userService.user) router.push(router.query.returnUrl || '/');
  }, []);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='flex items-center justify-center w-screen h-screen bg-gray-200'>
        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-col w-[300px] h-[300px] bg-white justify-between items-center rounded-md px-10 py-10'
        >
          <p className='font-serif text-lg'>JHU ACM</p>
          <div className='flex flex-col items-center w-full text-sm h-2/3'>
            <Input
              required
              id='username'
              name='username'
              placeholder='username'
              textAlign='center'
              textSize='sm'
              textColor='gray-500'
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <Input
              required
              id='password'
              name='password'
              type='password'
              placeholder='password'
              textAlign='center'
              textSize='sm'
              textColor='gray-500'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {error ? <p className='text-xs'>{error}</p> : null}
            <div className='flex justify-between w-full'>
              <button
                type='button'
                className='h-8 px-3 py-1 mt-3 w-[103px] font-medium leading-6 transition duration-200 ease-in-out bg-gray-300 rounded-md shadow-md text-normal hover:shadow-gray-300'
                onClick={() =>
                  router.query.returnUrl ? router.push('/') : router.back()
                }
              >
                Back
              </button>
              <button
                type='submit'
                disabled={loading}
                className='h-8 px-3 py-1 mt-3 w-[103px] font-medium leading-6 text-white transition duration-200 ease-in-out bg-gray-800 rounded-md shadow-md text-normal disabled:bg-gray-800/70 hover:shadow-gray-800/50'
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
