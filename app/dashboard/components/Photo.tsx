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
