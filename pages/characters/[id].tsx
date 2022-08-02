import { GetCharacterResults, Character } from "../../types";
import Image from "next/image";
import imageLoader from "../../imageLoader";
function CharacterPage({ character }: { character: Character }) {
  return (
    <div>
      <h1>{character.name}</h1>
      <Image
        src={character.image}
        alt={character.name}
        width="500px"
        height="500px"
        loader={imageLoader}
        unoptimized
      />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await res.json();
  return {
    paths: results.map((character) => {
      return { params: { id: String(character.id) } };
    }),
    fallback: false,
  };
}
export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const character = await res.json();
  return {
    props: {
      character,
    },
  };
}
export default CharacterPage;
