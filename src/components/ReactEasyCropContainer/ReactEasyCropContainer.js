/* eslint-disable react/jsx-props-no-spreading,no-unused-vars,no-shadow,react/prop-types */
import { useCallback, useState } from 'react';

import Cropper from 'react-easy-crop';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import getCroppedImg from './cropImage';
import Controls from '../common';
import { styles } from './styles';

const ReactEasyCropContainer = ({ imageURL, classes }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageURL, croppedAreaPixels, rotation);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div className={classes.cropArea}>
      {imageURL && (
        <div>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageURL}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <Controls zoom={zoom} setZoom={setZoom} rotation={rotation} setRotation={setRotation} />
          <div className={classes.btnContainer}>
            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Crop
            </Button>
          </div>
        </div>
      )}
      {croppedImage && (
        <div className={classes.croppedImageDiv}>
          <img src={croppedImage} alt="сropped" width="600px" />
        </div>
      )}
    </div>
  );
};

const styledReactEasyCropContainer = withStyles(styles)(ReactEasyCropContainer);

export default styledReactEasyCropContainer;
