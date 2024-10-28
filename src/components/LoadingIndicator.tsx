import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-white">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
