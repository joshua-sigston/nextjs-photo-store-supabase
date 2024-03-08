import React from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  photoName: string;
}

export default function PhotoModal({ src, alt, photoName }: Props) {
  // console.log(src, alt, photoName);
  return (
    <div className="relative z-20">
      <Image
        src={src}
        width={300}
        height={300}
        style={{ width: 'auto', height: 'auto' }}
        alt={alt}
        priority={true}
        className="shadow-lg"
      />
    </div>
  );
}
