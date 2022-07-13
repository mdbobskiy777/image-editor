/* eslint-disable jsx-a11y/label-has-associated-control,react/prop-types */
import React, { useState, useRef } from 'react';

import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDebounceEffect } from './useDebounceEffect';

import 'react-image-crop/dist/ReactCrop.css';
import { imgPreview } from './imgPreview';

// This is to demonstrate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};

export const ReactImageCropContainer = ({ imageURL }) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);

  /*  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  } */

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current) {
        // We can use canvasPreview as it's much faster than imgPreview.
        setPreviewSrc(await imgPreview(imgRef.current, completedCrop, scale, rotate));
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  }

  console.log('previewSrc: ', previewSrc);
  return (
    <div className="App">
      <div className="Crop-Controls">
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imageURL}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imageURL}
            onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
          />
        </div>
        <div>
          <button type="button" onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div>
      </div>
      {Boolean(imageURL) && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => {
            console.log('completed crop: ', c);
            setCompletedCrop(c);
          }}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imageURL}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            width="600px"
            /*
            onLoad={onImageLoad}
*/
          />
        </ReactCrop>
      )}
      <div>{previewSrc && <img alt="Crop preview" src={previewSrc} width="600px" />}</div>
    </div>
  );
};
