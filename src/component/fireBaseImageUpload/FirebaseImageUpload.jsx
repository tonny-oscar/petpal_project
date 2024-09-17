import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './config.js'; // Import the storage from your Firebase config

const FirebaseImageUpload = () => {
  const [file, setFile] = useState(null); // State for the selected file
  const [progress, setProgress] = useState(0); // State for upload progress
  const [imageUrl, setImageUrl] = useState(''); // State to store the uploaded image URL

  // Function to handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to handle the file upload
  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the file's storage location

    const uploadTask = uploadBytesResumable(storageRef, file); // Start the upload

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent); // Update the progress state
      },
      (error) => {
        console.error('Upload failed:', error); // Handle errors here
      },
      () => {
        // When the upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL); // Store the image URL
        });
      }
    );
  };

  return (
    <div>
      <h1>Firebase Image Upload</h1>
      <FileInput onChange={handleFileChange} />
      <UploadButton onClick={handleUpload} />
      <UploadProgress progress={progress} />
      <UploadedImage imageUrl={imageUrl} />
    </div>
  );
};

// Component to render file input
const FileInput = ({ onChange }) => (
  <input type="file" onChange={onChange} />
);

// Component to render upload button
const UploadButton = ({ onClick }) => (
  <button onClick={onClick}>Upload</button>
);

// Component to render upload progress
const UploadProgress = ({ progress }) => (
  progress > 0 && <progress value={progress} max="100">{progress}%</progress>
);

// Component to render uploaded image
const UploadedImage = ({ imageUrl }) => (
  imageUrl && (
    <div>
      <h3>Uploaded Image:</h3>
      <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
    </div>
  )
);

export default FirebaseImageUpload;
