import { format, formatDistance } from 'date-fns';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Layout } from '../../components';
import { H3 } from '../../components/mdx/heading';
import { userService, eventService } from '../../services';

const Event = () => {
  const router = useRouter();
  const [eventId, setEventId] = useState('');
  const [event, setEvent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(async () => {
    const id = router.query.id;
    if (id) setEventId(id);
  }, [router.query.id]);

  useEffect(async () => {
    if (eventId) {
      const res = await eventService.getOne(eventId);
      setEvent(res[0]);
    }
  }, [eventId]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setDeleteLoading(true);
    await eventService.deleteOne(id);
    setDeleteLoading(false);
    router.push('/events');
  };

  const handleEdit = async (e, id) => {
    e.stopPropagation();
    router.push(`/events/edit/${id}`);
  };

  return (
    <>
      <Head>
        <title>{event ? event.title : 'Loading...'}</title>
      </Head>
      <Layout>
        {event && (
          <article>
            <div className='w-full'>
              <p className='mt-2 mb-4 text-4xl font-bold'>{event.title}</p>
              <div className='flex justify-between w-full'>
                <H3>
                  <span>{`${event.author} · `}</span>
                  <span>
                    {format(new Date(event.time), 'LLLL d, yyyy KK:mm a')}
                  </span>
                  <span>{event.edits && ' (updated'}</span>
                  <span className='hidden sm:inline'>
                    {event.edits &&
                      ` ${formatDistance(
                        new Date(event.lastEditTime),
                        new Date(),
                        { addSuffix: true }
                      )}`}
                  </span>
                  <span>{')'}</span>
                </H3>
                {userService.user && (
                  <div className='relative flex items-center gap-1 -top-1.5'>
                    <button
                      onClick={(e) => handleEdit(e, event.id)}
                      className='flex items-center justify-center w-6 h-6 transition-colors duration-150 ease-in-out hover:text-sky-500'
                    >
                      <PencilAltIcon className='w-5 h-5' />
                    </button>
                    <button
                      disabled={deleteLoading}
                      onClick={(e) => handleDelete(e, event.id)}
                      className='flex items-center justify-center w-6 h-6 transition-colors duration-150 ease-in-out hover:text-sky-500 disabled:hover:text-black'
                    >
                      <TrashIcon className='w-5 h-5' />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div
              className='body'
              dangerouslySetInnerHTML={{ __html: event.contentHtml }}
            />
          </article>
        )}
      </Layout>
    </>
  );
};

export default Event;
