import { AnimeCard } from "@/components/anime-card";
import { Container } from "@/components/container";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;
  return (
    <Container>
      <AnimeCard id={id} />
    </Container>
  );
}
