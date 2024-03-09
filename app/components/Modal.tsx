import React from 'react';

export default function Modal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center h-full w-screen z-20">
      <div className="fixed top-0 left-0 w-screen h-full bg-zinc-700 opacity-90 flex items-center justify-center"></div>
      {children}
    </div>
  );
}
