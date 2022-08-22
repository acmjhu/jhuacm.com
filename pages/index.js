import Head from 'next/head';
import { Layout } from '../components';

const Home = () => {
  return (
    <>
      <Head>
        <title>JHU ACM</title>
        <meta
          name='description'
          content='Official site for the Association for Computing Machinery Johns Hopkins University Chapter'
        />
      </Head>
      <Layout landing>
        <div className='flex flex-col items-center justify-center gap-6'>
          <div>
            <h1 className='mb-1 text-4xl font-bold tracking-tight text-center text-gray-900 break-normal'>
              Johns Hopkins Association for Computing Machinery
            </h1>
            <h2 className='text-xl font-medium text-center text-gray-700'>
              Advancing information technology through the free exchange of
              ideas and information.
            </h2>
          </div>
          <div>
            <a
              className='flex items-center h-8 px-3 py-1 ml-3 text-xs font-medium leading-6 text-white bg-gray-800 rounded-md group'
              href='/about'
            >
              <strong className='font-semibold'>Check out who we are</strong>
              <svg
                width='3'
                height='6'
                className='ml-3 overflow-visible text-white transition-transform group-hover:translate-x-0.5 duration-150 ease-in-out'
                aria-hidden='true'
              >
                <path
                  d='M0 0L3 3L0 6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
