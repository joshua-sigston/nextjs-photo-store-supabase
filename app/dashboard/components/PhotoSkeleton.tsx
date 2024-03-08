import React from 'react';

export default function PhotoSkeleton() {
  return (
    <div className="w-[200px] h-[250px] border-2 rounded-md mx-auto">
      <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
        <div className="w-[85%] bg-gray-300 h-[85%] rounded-sm"></div>
      </div>
    </div>
  );
}
