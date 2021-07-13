import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = "joaopasantos";
  const friends = ["juunegreiros", "omariosouto", "peas", "rafaballerini"];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Amigos ({friends.length})</h2>
            <ul>
              {friends.map((current) => {
                return (
                  <li>
                    <a href={`/users/${current}`} key={current}>
                      <img src={`https://github.com/${current}.png`} />
                      <span>{current}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </>
  );
}
