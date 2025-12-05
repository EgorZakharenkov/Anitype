import { Container } from "@/components/layout/Container";
import { AnimeCard } from "@/components/anime/AnimeCard";

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
