import React from 'react';
import { supabaseServer } from '../../lib/supabaseServer';
import Photo from './Photo';
import {
  getFavorites,
  getPhotoUrls,
  getPhotos,
} from '@/app/functions/getFunctions';

interface User {
  id: string;
}

export default async function PhotosContainer() {
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  // console.log(user);
  const photos = await getPhotos(user);
  const photoObjects = await getPhotoUrls(photos, user as User);
  const favoritePhotos = await getFavorites(user as User);
  // console.log(photoObjects);
  return (
    <div className="mt-10 grid gap-5 place-content-center md:grid-cols-3">
      {photoObjects.map((photo, index) => (
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
  );
}
