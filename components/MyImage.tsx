import Image from "next/image";

const MyImage = ({
  imagePath,
  altText,
}: {
  imagePath: string;
  altText: string;
}) => {
  return (
    <Image
      src={imagePath}
      alt={altText}
      width={800}
      height={600}
      className="w-auto h-auto rounded-lg"
      placeholder="blur"
      blurDataURL="/placeholder.svg"
    />
  );
};

export default MyImage;
