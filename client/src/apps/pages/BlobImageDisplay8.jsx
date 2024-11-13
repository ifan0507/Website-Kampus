import React, { useEffect, useState } from "react";

export function BlobImageDisplay({ blob }) {
    const [blobUrl, setBlobUrl] = useState(null);
  
    useEffect(() => {
      if (blob) {
        setBlobUrl(blob)
      }
    }, [blob]);
  
    return (
      <div>
        {blobUrl ? (
          <img src={`data:image/png;base64,${blobUrl}`} style={{ height: "500px", width: "400px", textAlign:"center", marginLeft:"30px", marginTop:"20px"}} alt="Blob Image" />
        ) : (
          <p>No image to display</p>
        )}
      </div>
    );
  }