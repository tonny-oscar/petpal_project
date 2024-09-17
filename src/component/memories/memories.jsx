import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../fireBaseImageUpload/config.js'; 

const Memories = () => {
  const [items, setItems] = useState([]); 
  const [uploading, setUploading] = useState(false);

  //input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); 
    const newItems = files.map(file => ({
      file,
      description: ''
    }));
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  //description and change
  const handleDescriptionChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].description = value;
    setItems(updatedItems);
  };

  // Handle file upload
  const handleUpload = () => {
    setUploading(true);
    const uploadPromises = items.map((item) => {
      const storageRef = ref(storage, `images/${item.file.name}`); 
      const uploadTask = uploadBytesResumable(storageRef, item.file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error('Upload failed:', error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve({ url: downloadURL, description: item.description });
            });
          }
        );
      });
    });

    Promise.all(uploadPromises)
      .then((results) => {
        setUploading(false);
        alert('All uploads completed!');
      })
      .catch(() => {
        setUploading(false);
        alert('One or more uploads failed.');
      });
  };

  // Handle image deletion
  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1); 
    setItems(updatedItems);
  };

  //list of items with delete buttons
  const renderItems = () => {
    return items.map((item, index) => (
      <div key={index} className="relative flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md mb-4">
        {item.file.type.startsWith('image/') ? (
          <img src={URL.createObjectURL(item.file)} alt={`Uploaded ${index}`} className="w-40 h-40 object-cover rounded-lg" />
        ) : (
          <div className="text-gray-700">{item.file.name}</div>
        )}
        <textarea
          value={item.description}
          onChange={(e) => handleDescriptionChange(index, e.target.value)}
          placeholder="Add a description"
          className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        />
      
              
        {/* Delete Button */}
        <div>
            <button 
              onClick={() => handleDelete(index)} 
              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-700 transition"
            >
              delete
            </button>
        </div>
        </div>
    ));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Memories Component</h1>
      <FileInput onChange={handleFileChange} />
      <UploadButton onClick={handleUpload} disabled={uploading} uploading={uploading} />
      <div className="mt-6">
        {renderItems()}
      </div>
    </div>
  );
};

// File input component
const FileInput = ({ onChange }) => (
  <input type="file" multiple onChange={onChange} className="block w-full text-sm text-gray-700 mb-4" />
);

// Upload button component
const UploadButton = ({ onClick, disabled, uploading }) => (
  <button onClick={onClick} disabled={disabled} className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition duration-300 ${uploading ? 'bg-gray-500' : 'bg-red-500 hover:bg-blue-600'}`}>
    {uploading ? 'Uploading...' : 'Upload'}
  </button>
);

export default Memories;
