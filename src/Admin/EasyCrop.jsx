import React, { useState, useCallback } from 'react';
import  Cropper  from 'react-easy-crop';
import { Box, Slider, Button } from '@chakra-ui/react';

const EasyCrop = ({ image, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropChange = useCallback((newCrop) => {
    setCrop(newCrop);
  }, []);

  const onZoomChange = useCallback((newZoom) => {
    setZoom(newZoom);
  }, []);

  const handleCropButtonClick = async () => {
    // Calculate the actual cropped area in pixels
    const croppedAreaPixels = {
      x: crop.x * image.width,
      y: crop.y * image.height,
      width: crop.width * image.width,
      height: crop.height * image.height,
    };

    // Call the onCropComplete function with the cropped area in pixels
    onCropComplete(croppedAreaPixels);
  };

  return (
    <Box>
      <Cropper
        image={image.preview}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3} // Set the aspect ratio as needed
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
      />
      <Slider mt={4} value={zoom} onChange={(e) => setZoom(e.target.value)} min={1} max={3} step={0.1} />
      <Button mt={4} colorScheme="teal" onClick={handleCropButtonClick}>
        Crop Image
      </Button>
    </Box>
  );
};

export { EasyCrop };
