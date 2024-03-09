import React from 'react';
import Photo from './Photo';
import { makePhotoList } from '@/app/functions/getFunctions';
import PhotoUpload from './PhotoUpload';
import FavoritesModal from './FavoritesModal';

export default async function PhotosContainer() {
  const list = await makePhotoList();
  // console.log(list);

  return (
    <section>
      <div className="flex items-center justify-center gap-5">
        <PhotoUpload />
        <FavoritesModal list={list} />
      </div>
      <div className="mt-10 grid gap-5 place-content-center items-center md:grid-cols-3">
        {list.map((photo, index) => (
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
    </section>
  );
}
