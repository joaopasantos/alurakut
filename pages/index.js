/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        alt={`Imagem de perfil do usuário ${props.githubUser}`}
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @
        {props.githubUser}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title}
        {' '}
        (
        {props.data.length}
        )
      </h2>
      <ul>
        {props.data.slice(0, 6).map((current) => (
          <li key={current.id}>
            {/* `/users/${current.login}` */}
            <a href={`https://github.com/${current.login}`}>
              <img
                alt={`Imagem de perfil de ${current.login}`}
                src={current.avatar_url}
              />
              <span>{current.login}</span>
            </a>
          </li>
        ))}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home(props) {
  const { githubUser } = props;
  const [communities, setCommunities] = React.useState([]);
  const [following, setFollowing] = React.useState([]);
  React.useEffect(
    () => {
      // Friends (GitHub API)
      fetch(`https://api.github.com/users/${githubUser}/following`)
        .then((response) => response.json())
        .then((response) => {
          setFollowing(response);
        });
      // Communities (DatoCMS)
      fetch('https://graphql.datocms.com/',
        {
          method: 'POST',
          headers: {
            Authorization: '09df147c812366d20ee81f23f4b6f8',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: `query {
              allCommunities {
                id
                title
                imageUrl
                creatorSlug
              }
            }
            `,
          }),
        })
        .then((response) => response.json())
        .then((response) => {
          setCommunities(response.data.allCommunities);
        });
    },
    [],
  );

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCreateCommunity(event) {
                event.preventDefault();

                const formData = new FormData(event.target);
                const community = {
                  title: formData.get('title'),
                  imageUrl: formData.get('image'),
                  creatorSlug: githubUser,
                };
                fetch('/api/communities',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(community),
                  })
                  .then(async (response) => {
                    const responseJSON = await response.json();
                    const communityRecord = responseJSON.record;
                    setCommunities([communityRecord, ...communities]);
                  });
              }}
            >
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
              />
              <input
                placeholder="Insira uma URL para a imagem da comunidade."
                name="image"
                aria-label="Insira uma URL para a imagem da comunidade."
              />
              <button type="submit">Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Meus amigos" data={following} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades (
              {communities.length}
              )
            </h2>
            <ul>
              {communities.slice(0, 6).map((current) => (
                <li key={current.id}>
                  <a href={`/communities/${current.id}`}>
                    <img
                      alt={`Imagem da comunidade ${current.title}`}
                      src={current.imageUrl}
                    />
                    <span>{current.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { isAuthenticated } = await fetch('https://alurakut-joaopasantos.vercel.app/api/auth', {
    headers: {
      Authorization: token,
    },
  }).then((response) => response.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser,
    },
  };
}
