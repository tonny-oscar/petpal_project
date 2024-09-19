import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, database } from '../fireBaseImageUpload/config'; 
import { ref as dbRef, set, onValue, remove } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);//stores image from database
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch images from Firebase Realtime Database on component mount
  useEffect(() => {
    const imagesRef = dbRef(database, 'images');
    onValue(imagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedImages = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setImages(fetchedImages);
      }
    });
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setErrorMessage('');
    }
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);
      const fileId = uuidv4(); // Generate a unique ID for the file
      const storageRef = ref(storage, `images/${fileId}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: handle progress here if needed
        },
        (error) => {
          console.error('Upload failed:', error);
          setErrorMessage('Upload failed. Please try again.');
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newImage = {
              id: fileId,
              url: downloadURL,
              description: description,
            };
  
            // Check if the image with the same URL already exists
            const isDuplicate = images.some((image) => image.url === downloadURL);
  
            if (!isDuplicate) {
              // Save image metadata to Firebase Realtime Database
              const newImageRef = dbRef(database, 'images/' + fileId);
              set(newImageRef, newImage)
                .then(() => {
                  setImages((prevImages) => [...prevImages, newImage]); // Add new image to state
                  setSelectedFile(null); // Reset file input
                  setDescription(''); // Reset description
                  setUploading(false);
                })
                .catch((error) => {
                  setErrorMessage('Error saving image data. Please try again.');
                  setUploading(false);
                });
            } else {
              setErrorMessage('Duplicate image detected. Please upload a different file.');
              setUploading(false);
            }
          });
        }
      );
    } else {
      setErrorMessage('Please select a file to upload.');
    }
  };
  

  // Handle delete
  const handleDelete = (imageId, imageUrl) => {
    const imageRef = ref(storage, imageUrl);
    deleteObject(imageRef)
      .then(() => {
        const dbImageRef = dbRef(database, `images/${imageId}`);
        remove(dbImageRef)
          .then(() => {
            setImages((prevImages) => prevImages.filter((image) => image.id !== imageId)); // Update state
          })
          .catch((error) => {
            console.error('Error deleting image from database:', error);
          });
      })
      .catch((error) => {
        console.error('Error deleting image from storage:', error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Memories</h1>

      {/* File input and upload section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4 border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Add a description"
            className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
            disabled={!selectedFile || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>

      {/* Render uploaded image cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={image.url} alt="Uploaded" className="w-full h-64 object-cover" />
            <div className="p-4">
              <p className="text-gray-700">{image.description}</p>
              <button
                onClick={() => handleDelete(image.id, image.url)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-4 rounded-lg w-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;


