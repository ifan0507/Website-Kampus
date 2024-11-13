import React, { useEffect, useState } from "react";
import ReactImageMagnify from 'react-image-magnify';

export function BlobImageDisplay({ blob }) {
    const [blobUrl, setBlobUrl] = useState(null);
  
    useEffect(() => {
        if (blob) {
            setBlobUrl(`data:image/png;base64,${blob}`);
        }
    }, [blob]);
  
    return (
        <div style={{
          height: "500px",
          width: "730px",
          // marginTop:'20px',
          // marginLeft:"60px",
          // marginRight:"20px",
          // marginBottom:"40px", // Ubah nilai marginBottom di sini
          textAlign:"center"
        }}>
            <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: blobUrl, // Use blobUrl as the image source
                },
                largeImage: {
                    src: blobUrl, // Use blobUrl as the image source
                    width: 1200,
                    height: 1800
                },
                isHintEnabled: true,
                enlargedImagePosition: 'over'
            }} />
        </div>
    );
}
