import { supabaseServer } from "../lib/supabaseServer";

interface User {
  id: string;
}

interface Photo {
  name: string;
}

interface List {
  url: string,
  photoName: string,
  isFavored: boolean
}

interface List extends Array<List> {}

export async function getPhotos(user: User | null) {
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
}

export async function makePhotoList() {
  const {data, error} = await supabaseServer.auth.getSession()

  const user = data?.session?.user;
  console.log(user)

  const photos = await getPhotos(user as User);
  const photoObjects = await getPhotoUrls(photos, user as User);
  const favoritePhotos = await getFavorites(user as User);

  const photoList: List[] = [];
    photoObjects.map((photo) => {
    photoList.push({ ...photo, isFavored: false });
  });

    const newList = photoList.map((photo) => {
    if (favoritePhotos?.includes(photo.photoName)) {
      return { ...photo, isFavored: true };
    } else {
      return { ...photo };
    }
  });
  
  return newList
}

export async function getPhotoUrls(photos: any, user: User) {
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

export async function getFavorites(user: User | null) {
  if (!user) return;

  const { data, error } = await supabaseServer
    .from('favorites')
    .select('photo_name')
    .eq('user_id', user.id);

  // console.log(data, error);
  if (error) {
    console.log('Error fetching photos');
    throw new Error();
  }

  return data.map((favorite) => favorite.photo_name);
}