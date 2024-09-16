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
      <h1>Moments</h1>
      <br />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative', margin: '10px' }}>
            <img
              src={image}
              alt={`pet-moment-${index}`}
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                backgroundColor: '',
                color: 'red',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              delete
            </button>
            <textarea
              placeholder="Add a comment..."
              value={comments[index] || ''}
              onChange={(e) => handleCommentChange(index, e.target.value)}
              style={{ marginTop: '10px', width: '150px', resize: 'none' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moments;
