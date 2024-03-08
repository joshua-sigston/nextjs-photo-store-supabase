import React, { Suspense } from 'react';
import SignOutBtn from './components/SignOutBtn';
import PhotoUpload from './components/PhotoUpload';
import PhotosContainer from './components/PhotosContainer';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-neutral-50 max-w-[800px] mx-auto relative">
      <div className="text-center py-5">
        <div className="absolute top-5 right-5">
          <SignOutBtn />
        </div>
        <h1 className="mt-20">Your Photos</h1>
      </div>
      <PhotoUpload />
      <PhotosContainer />
    </main>
  );
}
