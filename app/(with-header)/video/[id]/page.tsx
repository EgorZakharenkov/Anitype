import { Container } from "@/components/layout/Container";
import { VideoCard } from "@/components/video/VideoCard/video-card";

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
