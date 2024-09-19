import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './config'; 

const FirebaseImageUpload = ({ file }) => {
  const [imageUrl, setImageUrl] = useState(''); 

  useEffect(() => {
    if (!file) return;

    const uploadFile = () => {
      const storageRef = ref(storage, `images/${file.name}`); 

      const uploadTask = uploadBytesResumable(storageRef, file); 

      uploadTask.on(
        'state_changed',
        null, 
        (error) => {
          console.error('Upload failed:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL); 
          });
        }
      );
    };

    uploadFile();
  }, [file]); 

  return (
    <div>

      <UploadedImage imageUrl={imageUrl} />
    </div>
  );
};

//uploaded image
const UploadedImage = ({ imageUrl }) => (
  imageUrl && (
    <div>
      <h3>Uploaded Image:</h3>
      <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
    </div>
  )
);

export default FirebaseImageUpload;
