import React, { useState, useEffect } from "react";

import PostView from "./post-view6p7in.png"
import ShareExtensionView from "./share-extension6p7in.png"
import WorldView from "./worldview6p7in.png"

function AppstoreScreenshotCarousel() {
  const images = [
    ShareExtensionView,
    PostView,
    WorldView
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <img src={images[index]} alt={`Image ${index}`} style={{ width: '300px', height: 'auto', borderRadius: '10px' }} />
    </div>
  );
}

export default AppstoreScreenshotCarousel;