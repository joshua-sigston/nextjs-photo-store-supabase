import { FaHeart } from 'react-icons/fa';
import { IoMdHeartDislike } from 'react-icons/io';

import React from 'react';
import { favorites } from '@/app/actions/favorites';

interface Props {
  photoName: string;
  isFavored: boolean;
}

export default function FavoriteBtn({ photoName, isFavored }: Props) {
  return (
    <form action={favorites} className="absolute bottom-3 right-14">
      <input type="hidden" name="photoName" value={photoName} />
      <input type="hidden" name="isFavored" value={isFavored.toString()} />
      <button
        type="submit"
        className={`btn bg-cyan-500 hover:bg-cyan-400 border-cyan-700 hover:border-cyan-500`}
      >
        {!isFavored ? <FaHeart /> : <IoMdHeartDislike />}
      </button>
    </form>
  );
}
