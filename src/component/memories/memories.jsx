import React, { useState } from 'react';

const Moments = () => {
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState({});

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setComments(prevComments => {
      const newComments = { ...prevComments };
      delete newComments[index];
      return newComments;
    });
  };

  const handleCommentChange = (index, newComment) => {
    setComments(prevComments => ({
      ...prevComments,
      [index]: newComment
    }));
  };
  return (
    <div>
      <div>
         <h1 className="text-6xl mt-4 mb-6 text-red-700">Moments</h1>
         </div>
     
      <div className="pb-6 bg-red-700">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
      </div>
      <div className="flex" >
        {images.map((image, index) => (
           <div key={index} className="m-4 height=100 width=120">
              <img
                src={image}
                alt={`pet-moment-${index}`}
              />
            <div>
              <br />
              <button
                onClick={() => handleRemoveImage(index)}>
                remove image
              </button>
          </div>

            <div>
              <textarea
                  placeholder="Add a comment..."
                  value={comments[index] || ''}
                  onChange={(e) => handleCommentChange(index, e.target.value)}
                />
            </div>
           
        </div>
        ))}
      </div>
    </div>
  );
};

export default Moments;
