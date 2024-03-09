'use client';
import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import PhotoSkeleton from './PhotoSkeleton';
import PhotoModal from './PhotoModal';
import Modal from '@/app/components/Modal';
import DeleteBtn from './DeleteBtn';
import FavoriteBtn from './FavoriteBtn';

interface Props {
  src: string;
  alt: string;
  photoName: string;
  width: number;
  height: number;
  isFavored: boolean;
}

export default function Photo({
  src,
  alt,
  width,
  height,
  photoName,
  isFavored = false,
}: Props) {
  const [reveal, setReveal] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const visibility = reveal ? 'visible' : 'hidden';
  const loader = reveal ? 'none' : 'inline-block';

  return (
    <div>
      <div style={{ visibility }} className="relative">
        <Image
          src={src}
          width={width}
          height={height}
          style={{
            width: 'auto',
            height: 'auto',
            objectFit: 'fill',
            border: isFavored ? '2px solid red' : '',
          }}
          className="rounded-sm shadow-md"
          alt={alt}
          priority={true}
          onLoad={() => setReveal(true)}
          onClick={() => {
            setToggleModal(true);
          }}
        />
        <FavoriteBtn photoName={photoName} isFavored={isFavored} />
        <DeleteBtn src={src} />
      </div>
      <span
        style={{
          display: loader,
          position: 'relative',
          margin: 'auto auto',
        }}
        className="w-[100%]"
      >
        <PhotoSkeleton />
      </span>
      {toggleModal && (
        <Modal>
          <h1
            className="fixed top-0 right-5 z-30 text-white cursor-pointer"
            onClick={() => {
              setToggleModal(false);
            }}
          >
            Close
          </h1>
          <PhotoModal src={src} alt={alt} photoName={photoName} />
        </Modal>
      )}
    </div>
  );
}

// user_uploads/ffdf9a6b-3549-4c00-b0a1-8d40cef4457d/0.10957709388804182.jpg File {name: 'hans-vivek-ntyA35WOb-k-unsplash.jpg', lastModified: 1700550210960, lastModifiedDate: Mon Nov 20 2023 23:03:30 GMT-0800 (Pacific Standard Time), webkitRelativePath: '', size: 2457331, …}lastModified: 1700550210960lastModifiedDate: Mon Nov 20 2023 23:03:30 GMT-0800 (Pacific Standard Time) {}name: "hans-vivek-ntyA35WOb-k-unsplash.jpg"size: 2457331type: "image/jpeg"webkitRelativePath: ""[[Prototype]]: FilelastModified: (...)lastModifiedDate: (...)name: (...)webkitRelativePath: (...)constructor: ƒ File()Symbol(Symbol.toStringTag): "File"size: (...)type: (...)get lastModified: ƒ lastModified()get lastModifiedDate: ƒ lastModifiedDate()get name: ƒ name()get webkitRelativePath: ƒ webkitRelativePath()[[Prototype]]: Blob
