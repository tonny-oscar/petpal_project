import React, { useEffect, useState } from "react";
import { imageDb } from "./config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FirebaseImageUpload() {
    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState([]);

    const handleClick = () => {
        if (img) {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, img).then(value => {
                console.log("Upload successful:", value);
                
                getDownloadURL(imgRef).then(url => {
                    setImgUrl(prevUrls => [...prevUrls, url]);
                }).catch(error => {
                    console.error("Error getting image URL:", error);
                });
            }).catch(error => {
                console.error("Error uploading image:", error);
            });
        } else {
            console.log("No image selected");
        }
    };

    useEffect(() => {
        listAll(ref(imageDb, "files")).then(imgs => {
            console.log("Images:", imgs);
            const fetchUrls = imgs.items.map(item =>
                getDownloadURL(item).then(url => url).catch(error => {
                    console.error("Error getting image URL:", error);
                    return null; 
                })
            );
            Promise.all(fetchUrls).then(urls => {
                setImgUrl(urls.filter(url => url !== null));
            }).catch(error => {
                console.error("Error fetching image URLs:", error);
            });
        }).catch(error => {
            console.error("Error listing images:", error);
        });
    }, []);

    console.log("Image URLs:", imgUrl);

    return (
        <div className="App">
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            <button onClick={handleClick}>Upload</button>
            <div>
                {imgUrl.map((url, index) => (
                    <img key={index} src={url} alt={`Uploaded #${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                ))}
            </div>
        </div>
    );
}

export default FirebaseImageUpload;
