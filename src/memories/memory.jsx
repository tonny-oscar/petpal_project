import React, { useState } from 'react';

const Moments = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Moments</h1>
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
              alt='{pet-moment-${index}}'
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moments;