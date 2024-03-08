import React, { Suspense } from 'react';
import SignOutBtn from './components/SignOutBtn';
import PhotoUpload from './components/PhotoUpload';
import PhotosContainer from './components/PhotosContainer';

export default function Dashboard() {
  return (
    <main>
      <div className="fixed top-5 right-5">
        <SignOutBtn />
      </div>
      <h2>Dashboard Page</h2>
      <PhotoUpload />
      <PhotosContainer />
    </main>
  );
}
