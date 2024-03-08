'use client';

import React from 'react';
import { supabaseClient } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignOutBtn() {
  const router = useRouter();
  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.push('/');
  };
  return (
    <button
      onClick={handleSignOut}
      className="btn bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500"
    >
      Sign out
    </button>
  );
}
