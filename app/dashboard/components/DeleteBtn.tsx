import { deletePhoto } from '@/app/actions/delete';
import React from 'react';
import { FaTrashCan } from 'react-icons/fa6';

interface Props {
  src: string;
}

export default function DeleteBtn({ src }: Props) {
  return (
    <form action={deletePhoto} className="absolute bottom-3 right-3">
      <input type="hidden" name="photoPath" value={src} />
      <button
        type="submit"
        className="btn bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500"
      >
        <FaTrashCan />
      </button>
    </form>
  );
}
