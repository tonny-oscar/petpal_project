import React, { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { database } from '../fireBaseImageUpload/config'; 
import { Link } from 'react-router-dom';
import ImageCard from './ImageCard'; 

const Memories = () => {
  const [items, setItems] = useState([]);

  // Fetch items from the Realtime Database
  useEffect(() => {
    const itemsRef = ref(database, 'memories/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setItems(Object.entries(data)); 
      } else {
        setItems([]);
      }
    });
  }, []);

  return (
    <div>
      <h2>Uploaded Memories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(([id, item]) => (
          <Link to={`/image/${id}`} key={id} className="no-underline">
            <ImageCard 
              imageUrl={item.url}
              description={item.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Memories;
