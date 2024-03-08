'use client';
import Image from 'next/image';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Home() {
  const [toggleSignIn, setToggleSignIn] = useState(false);
  const [toggleSignUp, setToggleSignUp] = useState(false);

  return (
    <main className="min-h-screen bg-gray-200 flex items-center justify-center">
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
        <div className="fixed flex items-center justify-center">
          <div className="fixed top-0 left-0 w-screen min-h-screen bg-gray-700 opacity-65 flex items-center justify-center">
            <h3
              className="fixed top-0 right-5 z-10 text-white cursor-pointer"
              onClick={() => {
                setToggleSignIn(false);
              }}
            >
              Close
            </h3>
          </div>
          <SignIn />
        </div>
      )}
      {toggleSignUp && (
        <div className="fixed flex items-center justify-center">
          <div className="fixed top-0 left-0 w-screen min-h-screen bg-gray-700 opacity-65 flex items-center justify-center">
            <h3
              className="fixed top-0 right-5 z-10 text-white cursor-pointer"
              onClick={() => {
                setToggleSignUp(false);
              }}
            >
              Close
            </h3>
          </div>
          <SignUp />
        </div>
      )}
    </main>
  );
}
