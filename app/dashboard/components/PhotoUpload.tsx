'use client';

import React, { useState } from 'react';
import { supabaseClient } from '../../lib/supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function PhotoUpload() {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const errorMsg = (arg: string) => {
    toast.error(arg, {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const successMsg = () => {
    toast.success('Photo uploaded', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const handleFileUpload = async (e: any) => {
    try {
      setUploading(true);

      const file = e.target.files[0];
      const fileName = file.name.split('.').pop();
      const fileExt = `${Math.random()}.${fileName}`;

      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) {
        console.log('user not found');
      }

      const filePath = `user_uploads/${user?.id}/${fileExt}`;

      const { error } = await supabaseClient.storage
        .from('photos')
        .upload(filePath, file);

      if (error) {
        console.log(error);
        errorMsg(error.message);
      }
      successMsg();

      setTimeout(() => {
        router.refresh();
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-center h-fit">
      <form>
        <label
          htmlFor="photo-upload"
          className="btn bg-lime-500 hover:bg-lime-400 border-lime-700 hover:border-lime-500"
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}

          <input
            type="file"
            id="photo-upload"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </form>
      <ToastContainer />
    </div>
  );
}
