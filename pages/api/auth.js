import jwt from 'jsonwebtoken';

export default async function requestHandler(request, response) {
  if (request.method === 'POST') {
    const token = request.headers.Authorization;
    const { githubUser } = jwt.decode(token);
    fetch(`https://api.github.com/users/${githubUser}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message === 'Not Found') {
          response.json({
            isAuthenticated: false,
          });

          return;
        }
        response.json({
          isAuthenticated: true,
        });
      });
  }
}
