'use client';
import Image from 'next/image';
import { useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Modal from './components/Modal';

export default function Home() {
  const [toggleSignIn, setToggleSignIn] = useState(false);
  const [toggleSignUp, setToggleSignUp] = useState(false);

  return (
    <main className="min-h-screen bg-gray-200 flex flex-col gap-5 items-center justify-center text-center">
      <h1>Welcome to your PhotoBucket.</h1>
      <p>Please sign in or sign up to upload and save photos.</p>
      <div className="flex gap-5">
        <button
          onClick={() => {
            setToggleSignIn(!toggleSignIn);
            setToggleSignUp(false);
          }}
          className="btn bg-orange-500 hover:bg-orange-400 border-orange-700 hover:border-orange-500"
        >
          SignIn
        </button>
        <button
          onClick={() => {
            setToggleSignUp(!toggleSignUp);
            setToggleSignIn(false);
          }}
          className="btn bg-teal-500 hover:bg-teal-400 border-teal-700 hover:border-teal-500"
        >
          SignUp
        </button>
      </div>
      {toggleSignIn && (
        <Modal>
          <h3
            className="fixed top-0 right-5 z-10 text-white cursor-pointer"
            onClick={() => {
              setToggleSignIn(false);
            }}
          >
            Close
          </h3>
          <SignIn />
        </Modal>
      )}
      {toggleSignUp && (
        <Modal>
          <h3
            className="fixed top-0 right-5 z-10 text-white cursor-pointer"
            onClick={() => {
              setToggleSignUp(false);
            }}
          >
            Close
          </h3>
          <SignUp />
        </Modal>
      )}
    </main>
  );
}
