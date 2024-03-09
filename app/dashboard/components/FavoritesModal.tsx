'use client';
import Modal from '@/app/components/Modal';
import React, { useState } from 'react';
import Photo from './Photo';

interface List {
  url: string;
  photoName: string;
  isFavored: boolean;
}

interface FavoriteModalProps {
  list: List[];
}

export default function FavoritesModal({ list }: FavoriteModalProps) {
  const [toggleModal, setToggleModal] = useState(false);

  const showFavorites = () => {
    setToggleModal(true);
  };

  return (
    <div>
      <label
        className="btn bg-pink-500 hover:bg-pink-400 border-pink-700 hover:border-pink-500 cursor-pointer"
        onClick={showFavorites}
      >
        See Favorites
      </label>
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
          <div className="grid gap-5 items-center md:grid-cols-3 p-5 h-screen overflow-y-scroll">
            {list
              .filter((photo) => {
                return photo.isFavored === true;
              })
              .map((photo, index) => (
                <div key={index}>
                  <Photo
                    src={photo?.url}
                    alt={`Photo ${photo?.photoName}`}
                    photoName={photo?.photoName}
                    width={300}
                    height={300}
                    isFavored={photo.isFavored}
                  />
                </div>
              ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
