import jwt from 'jsonwebtoken';

export default async function requestHandler(request, response) {
  const { authorization } = request.headers;
  const token = authorization;

  const { githubUser } = jwt.decode(token);
  fetch(`https://api.github.com/users/${githubUser}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.message === 'Not Found') {
        response.send({
          isAuthenticated: false,
        });
        return;
      }
      response.send({
        isAuthenticated: true,
      });
      // eslint-disable-next-line no-useless-return
      return;
    });
}
