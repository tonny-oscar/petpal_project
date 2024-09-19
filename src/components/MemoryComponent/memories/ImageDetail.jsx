import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, get } from "firebase/database";
import { database } from '../fireBaseImageUpload/config'; // Adjust the import path as needed

const ImageDetail = () => {
  const { id } = useParams(); // Get the image ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    const fetchImage = async () => {
      const imageRef = ref(database, `memories/${id}`);
      const snapshot = await get(imageRef);
      if (snapshot.exists()) {
        setImage(snapshot.val());
      } else {
        console.error("No such image!");
      }
    };
    
    fetchImage();
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate('/')} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Back
      </button>
      {image && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={image.url} alt="Uploaded" className="w-full h-64 object-cover" />
          <div className="p-4">
            <p className="text-gray-700">{image.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetail;
