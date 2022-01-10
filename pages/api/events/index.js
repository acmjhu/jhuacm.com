import { clientPromise } from '../../../lib/mongodb';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getEvents();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getEvents() {
    const client = await clientPromise;
    const db = client.db();
    const events = await db
      .collection('events')
      .find({})
      .sort({ time: -1 })
      .toArray();
    const response = JSON.parse(JSON.stringify(events));
    return res.status(200).json(response);
  }
};
