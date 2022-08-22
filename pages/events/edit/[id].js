import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { EventEditor } from '../../../components';
import { eventService } from '../../../services';

const Edit = () => {
  const router = useRouter();
  const [eventId, setEventId] = useState('');
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const id = router.query.id;
    setEventId(id);
  }, []);

  useEffect(async () => {
    const res = await eventService.getOne(eventId);
    setEvent(res[0]);
  }, [eventId]);

  return (
    <>
      <Head>
        <title>Update Event</title>
      </Head>
      <EventEditor event={event} />
    </>
  );
};

export default Edit;
