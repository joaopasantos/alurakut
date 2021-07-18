import jwt from 'jsonwebtoken';

export default async function requestHandler(request, response) {
  const { Authorization } = request.headers;
  console.log(Authorization);
  const token = Authorization;
  console.log(token);
  const { githubUser } = jwt.decode(token);
  console.log(githubUser);
  fetch(`https://api.github.com/users/${githubUser}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
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
