import React from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = "joaopasantos";
  const friends = ["juunegreiros", "omariosouto", "peas", "rafaballerini"];
  const [communities, setComunidades] = React.useState([
    {
      id: new Date().toISOString,
      title: "Eu odeio programação",
      image:
        "data:image/jpeg;base64,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",
    },
  ]);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCreateCommunity(event) {
                event.preventDefault();

                const data = new FormData(event.target);
                const community = {
                  id: new Date().toISOString,
                  title: data.get("title"),
                  image: data.get("image"),
                };
                setComunidades([...communities, community]);
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
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus amigos ({friends.length})</h2>
            <ul>
              {friends.map((current) => {
                return (
                  <li key={current}>
                    <a href={`/users/${current}`}>
                      <img src={`https://github.com/${current}.png`} />
                      <span>{current}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((current) => {
                return (
                  <li key={current.id}>
                    <a href={`/communities/${current}`}>
                      <img src={current.image} />
                      <span>{current.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
