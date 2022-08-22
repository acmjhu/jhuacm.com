import { parseMarkdown } from '../../../lib';
import { apiHandler } from '../../../lib/api';
import { clientPromise } from '../../../lib/mongodb';

const formatId = (title, count) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-')
    .concat(`-${count}`);

const handler = async ({ body, method }, res) => {
  switch (method) {
    case 'POST':
      return create(body);
    case 'PUT':
      return update(body);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }

  async function create(body) {
    const { title, author, content, time } = body;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('events');
    const count = (await collection.count()) + 1;
    const id = formatId(title, count);
    const event = {
      id,
      title,
      author,
      contentHtml: await parseMarkdown(content),
      contentMd: content,
      time,
      edits: 0,
      lastEditTime: 0,
    };
    await collection.insertOne(event);

    return res.status(200).json(event);
  }

  async function update(body) {
    const { id, title, author, content } = body;
    const now = new Date().getTime();
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('events');
    const event = (await collection.find({ id }).toArray())[0];
    let newId = id;
    if (title !== event.title) {
      const arr = event.id.split('-');
      const serial = arr[arr.length - 1];
      newId = formatId(title, serial);
    }
    const response = await collection.updateOne(
      { id },
      {
        $set: {
          id: newId,
          title,
          author,
          contentHtml: await parseMarkdown(content),
          contentMd: content,
          edits: event.edits + 1,
          lastEditTime: now,
        },
      }
    );

    return res.status(200).json(response);
  }
};

export default apiHandler(handler);
