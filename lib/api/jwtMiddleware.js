import expressJwt from 'express-jwt';
import util from 'util';

export const jwtMiddleware = (req, res) => {
  const middleware = expressJwt({
    secret:
      process.env.NODE_ENV === 'development' ? 'myscecret' : process.env.SECRET,
    algorithms: ['HS256'],
  }).unless({ path: '/api/users/authenticate' });

  return util.promisify(middleware)(req, res);
};
