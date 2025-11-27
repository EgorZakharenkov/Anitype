import { Container } from "@/components/container";
import { VideoCard } from "@/components/video-player/video-card";

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
      <VideoCard id={id} />
    </Container>
  );
}
