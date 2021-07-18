import jwt from 'jsonwebtoken';

export default async function requestHandler(request, response) {
  const { authorization } = request.headers;
  const token = authorization;
  const { githubUser } = jwt.decode(token);
  await fetch(`https://api.github.com/users/${githubUser}`)
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

  response.status(404).json({
    message: 'Rota GET não implementada.',
  });
}
