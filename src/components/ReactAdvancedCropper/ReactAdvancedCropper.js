/* eslint-disable react/jsx-props-no-spreading,no-unused-vars,no-shadow,react/prop-types */
import { useRef, useState } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import './styles.scss';

export const ReactAdvancedCropper = ({ imageURL }) => {
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);

  const flip = (horizontal, vertical) => {
    if (cropperRef.current) {
      cropperRef.current.flip(horizontal, vertical);
    }
  };
  const rotate = (angle) => {
    if (cropperRef.current) {
      console.log(cropperRef.current);

      cropperRef.current.rotateImage(angle);
    }
  };

  const onCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        setCroppedImage(canvas.toDataURL());
      }
    }
  };

  return (
    <div className="example">
      <div className="example__cropper-wrapper">
        <Cropper
          ref={cropperRef}
          className="example__cropper"
          backgroundClassName="example__cropper-background"
          src={imageURL}
        />
      </div>
      <div className="example__buttons-wrapper">
        {imageURL && (
          <button type="button" className="example__button" onClick={onCrop}>
            Crop
          </button>
        )}
        <button
          type="button"
          className="example__button"
          onClick={() => {
            rotate(90);
          }}
        >
          Rotate
        </button>
      </div>
      <div>
        {croppedImage && (
          <div className="example__cropped-image-container">
            <img className="example__cropped-image" src={croppedImage} alt="croppedImage" />
          </div>
        )}
      </div>
    </div>
  );
};
