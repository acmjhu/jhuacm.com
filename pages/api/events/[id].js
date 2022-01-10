import { clientPromise } from '../../../lib/mongodb';

export default async ({ query: { id }, method }, res) => {
  switch (method) {
    case 'GET':
      return getEvent(id);
    case 'DELETE':
      return deleteEvent(id);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }

  async function getEvent(id) {
    const client = await clientPromise;
    const db = client.db();
    const event = await db.collection('events').find({ id }).toArray();
    const response = JSON.parse(JSON.stringify(event));
    return res.status(200).json(response);
  }

  async function deleteEvent(id) {
    const client = await clientPromise;
    const db = client.db();
    const response = await db.collection('events').deleteOne({ id });
    return res.status(200).json(response);
  }
};
