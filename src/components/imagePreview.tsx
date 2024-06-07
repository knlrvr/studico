import Image from "next/image";

const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export default function ImagePreview({ storageId }: { storageId: string }) {
  const getImageUrl = new URL(`${convexSiteUrl}/getImage`);
  getImageUrl.searchParams.set("storageId", storageId);

  return <Image src={getImageUrl.href} height={1000} width={1000} alt="image" className="h-10 w-10" />;
}