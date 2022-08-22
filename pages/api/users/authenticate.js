import jwt from 'jsonwebtoken';
import { apiHandler } from '../../../lib/api';
import { clientPromise } from '../../../lib/mongodb';

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    const { username, password } = req.body;

    const client = await clientPromise;
    const db = client.db();
    const users = JSON.parse(
      JSON.stringify(await db.collection('users').find({}).toArray())
    );
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) throw 'Username or password is incorrect';

    const token = jwt.sign(
      { sub: user.id },
      process.env.NODE_ENV === 'development' ? 'myscecret' : process.env.SECRET,
      {
        expiresIn: '7d',
      }
    );

    return res.status(200).json({
      id: user.id,
      username: user.username,
      token,
    });
  }
};

export default apiHandler(handler);
