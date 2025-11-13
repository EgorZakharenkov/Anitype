import { Header } from "@/components/header";
import { AnimeCard } from "@/components/anime-card";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;
  return (
    <div>
      <Header />
      <AnimeCard id={id} />
    </div>
  );
}
