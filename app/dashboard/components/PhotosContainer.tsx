import React, { Suspense } from 'react';
import { supabaseServer } from '../../lib/supabaseServer';
import Photo from './Photo';
import Image from 'next/image';

interface User {
  id: string;
}

interface Photo {
  name: string;
}

interface Photos {
  photos: Photo[];
}

const fetchPhotos = async (user: User | null) => {
  if (!user) return;

  const folderPath = `user_uploads/${user.id}/`;
  const { data, error } = await supabaseServer.storage
    .from('photos')
    .list(folderPath);

  if (error) {
    console.log('Error fetching photos');
    throw new Error();
  }

  return data;
};

async function getPhotoUrls(photos: any, user: User) {
  return Promise.all(
    photos?.map(async (photo: Photo) => {
      const { data, error } = await supabaseServer.storage
        .from('photos')
        .createSignedUrl(`user_uploads/${user?.id}/${photo.name}`, 60 * 60);
      if (error) {
        console.error('Error generating signed url', error);
        return null;
      }
      return { url: data.signedUrl, photoName: photo.name };
    }),
  );
}

async function getFavorites(user: User | null) {
  if (!user) return;

  const { data, error } = await supabaseServer
    .from('favorites')
    .select('photo_name')
    .eq('user_id', user.id);

  console.log(data, error);
  if (error) {
    console.log('Error fetching photos');
    throw new Error();
  }

  return data.map((favorite) => favorite.photo_name);
}

export default async function PhotosContainer() {
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  // console.log(user);
  const photos = await fetchPhotos(user);
  const photoObjects = await getPhotoUrls(photos, user as User);
  const favoritePhotos = await getFavorites(user as User);
  // console.log(photoObjects);
  return (
    <div>
      <h1 className="mt-5">PhotosContainer</h1>
      <Suspense
        fallback={
          <p className="h-[200px] w-[200px] bg-slate-500">Loading...</p>
        }
      >
        {photoObjects.map((photo, index) => (
          <Photo
            key={index}
            src={photo?.url}
            alt={`Photo ${photo?.photoName}`}
            photoName={photo?.photoName}
          />
        ))}
      </Suspense>
    </div>
  );
}
