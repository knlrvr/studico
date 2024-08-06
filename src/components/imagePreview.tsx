import Image from "next/image";

export default function ImagePreview({ src }: { src: string }) {
  return <Image src={src} height={1000} width={1000} alt="image" className="h-[4rem] w-[4rem] object-cover rounded-md m-0" />;
}