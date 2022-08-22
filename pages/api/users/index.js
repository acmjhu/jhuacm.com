import { clientPromise } from '../../../lib/mongodb';
import { apiHandler } from '../../../lib/api';

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getUsers();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUsers() {
    const client = await clientPromise;
    const db = client.db();
    const users = JSON.parse(
      JSON.stringify(await db.collection('users').find({}).toArray())
    );
    const response = users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword
    );
    return res.status(200).json(response);
  }
};

export default apiHandler(handler);
