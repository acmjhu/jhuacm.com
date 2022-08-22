import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  PlusCircleIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { format } from 'date-fns';
import { Layout, Link } from '../../components';
import { H1 } from '../../components/mdx/heading';
import { userService, eventService } from '../../services';

const Events = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(async () => {
    if (!deleteLoading) {
      const res = await eventService.getAll();
      setEvents(res);
    }
  }, [deleteLoading]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setDeleteLoading(true);
    await eventService.deleteOne(id);
    setDeleteLoading(false);
  };

  const handleEdit = async (e, id) => {
    e.stopPropagation();
    router.push(`/events/edit/${id}`);
  };

  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <Layout>
        <div className='flex justify-between w-full'>
          <H1>Events</H1>
          {userService.user && (
            <Link
              href='/events/create'
              className='flex items-center text-xl transition duration-200 ease-in-out hover:text-sky-500'
            >
              <PlusCircleIcon className='w-6 h-6' />
            </Link>
          )}
        </div>
        <div className='divide-y'>
          {events.map(({ id, title, author, time }) => {
            const date = format(new Date(time), 'LLLL d, yyyy KK:mm a');

            return (
              <div
                key={id}
                onClick={() => router.push(`/events/${id}`)}
                className='flex justify-between w-full py-2 group hover:cursor-pointer'
              >
                <div className='w-full'>
                  <p className='pb-0.5 text-2xl font-semibold group-hover:text-sky-500 transition-colors duration-200 ease-in-out'>
                    {title}
                  </p>
                  <div className='flex justify-between'>
                    <p className='text-sm transition-colors duration-200 ease-in-out group-hover:text-sky-500'>
                      {author} · {date}
                    </p>
                    <div className='relative flex items-center'>
                      {userService.user && (
                        <div className='flex gap-1'>
                          <button
                            onClick={(e) => handleEdit(e, id)}
                            className='items-center justify-center hidden transition-colors duration-150 ease-in-out group-hover:flex hover:text-sky-500'
                          >
                            <PencilAltIcon className='w-5 h-5' />
                          </button>
                          <button
                            disabled={deleteLoading}
                            onClick={(e) => handleDelete(e, id)}
                            className='items-center justify-center hidden transition-colors duration-150 ease-in-out group-hover:flex hover:text-sky-500 disabled:hover:text-black'
                          >
                            <TrashIcon className='w-5 h-5' />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default Events;
