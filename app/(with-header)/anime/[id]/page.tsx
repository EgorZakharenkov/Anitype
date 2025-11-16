import { AnimeCard } from "@/components/anime-card";
import styles from "./style.module.scss";
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
    <div className={styles.animePage}>
      <Container>
        <AnimeCard id={id} />
      </Container>
    </div>
  );
}
