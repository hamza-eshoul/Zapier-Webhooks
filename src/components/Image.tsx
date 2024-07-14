import { twMerge } from "tailwind-merge";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image = ({ src, alt, className }: ImageProps) => {
  return (
    <img
      src={src}
      className={twMerge("h-full w-full object-cover", className)}
      alt={alt}
    />
  );
};

export default Image;
