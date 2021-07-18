import jwt from 'jsonwebtoken';

export default async function requestHandler(request, response) {
  const { Authorization } = request.headers;
  const token = Authorization;

  const { githubUser } = jwt.decode(token);
  fetch(`https://api.github.com/users/${githubUser}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.message === 'Not Found') {
        response.send({
          isAuthenticated: false,
        });
      }
      response.send({
        isAuthenticated: true,
      });
    });
}
