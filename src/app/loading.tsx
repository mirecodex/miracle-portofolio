import React from 'react';

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-dark-900">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 border-4 border-t-primary-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-primary-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin animation-delay-150"></div>
        <div className="absolute inset-4 border-4 border-t-primary-700 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin animation-delay-300"></div>
      </div>
    </div>
  );
}
