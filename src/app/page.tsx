import CharacterGrid from "../Component/CharacterGrid";
import { getCmsData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getCmsData();
  const characters = data.homeCharacters.filter((item) => item.isActive);

  return <CharacterGrid characters={characters} />;
}
