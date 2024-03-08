import { FaHeart } from 'react-icons/fa';

import React from 'react';

interface Props {
  photoName: string;
  isFavored: boolean;
}

export default function FavoriteBtn({ photoName, isFavored }: Props) {
  return (
    <form action="" className="absolute bottom-3 right-14">
      <input type="hidden" name="photoName" value={photoName} />
      <input type="hidden" name="isFavorited" value={isFavored.toString()} />
      <button
        type="submit"
        className="btn bg-cyan-500 hover:bg-cyan-400 border-cyan-700 hover:border-cyan-500"
      >
        <FaHeart />
      </button>
    </form>
  );
}
