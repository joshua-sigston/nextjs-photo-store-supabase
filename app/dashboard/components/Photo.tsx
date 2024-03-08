'use client';
import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import PhotoSkeleton from './PhotoSkeleton';
import PhotoModal from './PhotoModal';
import { FaTrashCan } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { deletePhoto } from '@/app/actions/delete';

interface Props {
  src: string;
  alt: string;
  photoName: string;
}

export default function Photo({ src, alt, photoName }: Props) {
  const [reveal, setReveal] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const visibility = reveal ? 'visible' : 'hidden';
  const loader = reveal ? 'none' : 'inline-block';

  return (
    <div>
      <div
        onClick={() => {
          setToggleModal(!toggleModal);
        }}
      >
        <Image
          src={src}
          width={300}
          height={300}
          style={{ width: 'auto', height: 'auto', visibility }}
          alt={alt}
          priority={true}
          onLoad={() => setReveal(true)}
        />
      </div>
      <form action={deletePhoto}>
        <input type="hidden" name="photoPath" value={src} />
        <button
          type="submit"
          className="btn bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500"
        >
          <FaTrashCan />
        </button>
      </form>
      <span
        style={{
          display: loader,
          position: 'relative',
        }}
      >
        <PhotoSkeleton />
      </span>
      {toggleModal && (
        <div className="fixed top-0 flex items-center justify-center w-screen h-screen">
          <div className="fixed top-0 left-0 w-screen min-h-screen bg-gray-700 opacity-65 flex items-center justify-center">
            <h3
              className="fixed top-0 right-5 z-10 text-white cursor-pointer"
              onClick={() => {
                setToggleModal(false);
              }}
            >
              Close
            </h3>
          </div>
          <PhotoModal src={src} alt={alt} photoName={photoName} />
        </div>
      )}
    </div>
  );
}
