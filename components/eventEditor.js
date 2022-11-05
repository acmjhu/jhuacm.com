import { useEffect, useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import 'bytemd/dist/index.min.css';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Layout } from '.';
import { H1 } from './mdx/heading';
import { eventService } from '../services';
import { Input } from '.';
import 'github-markdown-css/github-markdown-light.css';

const plugins = [gfm()];

export const EventEditor = ({ event = null }) => {
  const [content, setContent] = useState(
    '<!-- start composing post content here -->'
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
    },
    onSubmit: async ({ title, author }) => {
      setLoading(true);
      try {
        if (!event) {
          const time = new Date().getTime();
          await eventService.create(title, author, content, time);
        } else {
          await eventService.update(event.id, title, author, content);
        }
        setLoading(false);
        router.push('/events');
      } catch (err) {
        setLoading(false);
      }
    },
  });

  useEffect(async () => {
    if (event) {
      await formik.setFieldValue('title', event.title);
      await formik.setFieldValue('author', event.author);
      setContent(event.contentMd);
    }
  }, [event]);

  return (
    <Layout landing={false}>
      <H1>{`${event ? 'Update' : 'Create'} event`}</H1>
      <form onSubmit={formik.handleSubmit} className='flex flex-col'>
        <Input
          required
          id='title'
          name='title'
          type='text'
          placeholder='Title'
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <Input
          required
          id='author'
          name='author'
          type='text'
          placeholder='Author'
          value={formik.values.author}
          onChange={formik.handleChange}
        />
        <Editor
          id='content'
          plugins={plugins}
          value={content}
          onChange={(v) => setContent(v)}
        />
        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={loading}
            className={`h-8 px-3 py-1 mt-3 text-normal font-medium leading-6 text-white transition duration-200 ease-in-out bg-gray-800 rounded-md shadow-md disabled:bg-gray-800/70 hover:shadow-gray-800/50`}
          >
            {event ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Layout>
  );
};
