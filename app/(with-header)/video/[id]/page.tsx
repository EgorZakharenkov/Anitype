export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;
  return <div></div>;
}
