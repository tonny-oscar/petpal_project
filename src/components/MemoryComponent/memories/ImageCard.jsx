import React from 'react';

const ImageCard = ({ imageUrl, description, onViewClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={imageUrl} alt="Uploaded" className="w-full h-64 object-cover" />
      <div className="p-4">
        <p className="text-gray-700">{description}</p>
        <button 
          onClick={onViewClick} 
          className="mt-2 py-1 px-4 bg-blue-500 text-white rounded"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
