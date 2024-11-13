import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
export function BlobImageDisplay({ blobs }) {
  const [blobUrls, setBlobUrls] = useState([]);

  useEffect(() => {
    if (blobs) {
      const urls = blobs.map((blob) => `data:image/png;base64,${blob}`);
      setBlobUrls(urls);
    }
  }, [blobs]);

 

  return (
    <div style={{ display: 'flex',  marginLeft: '330px', width: '400%'}}>
      {blobUrls.length > 0 ? (
        <ImageGallery
          items={blobUrls.map((url) => ({
            original: url,
            thumbnail: url,
            originalHeight: 500,
            originalWidth: 40,
            thumbnailHeight: 150,
            thumbnailWidth: 225, 
          }))}
          showThumbnails={false}
          slideInterval={1500}
          autoPlay={true}
          infinite={true}
        />
      ) : (
        <p>No images to display</p>
      )}
    </div>
  );
}
