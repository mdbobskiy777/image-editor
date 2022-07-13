/* eslint-disable jsx-a11y/label-has-associated-control,react/prop-types */
import React, { useState, useRef } from 'react';

import ReactCrop from 'react-image-crop';

import { useDebounceEffect } from './useDebounceEffect';

import { imgPreview } from './imgPreview';

import 'react-image-crop/dist/ReactCrop.css';
import Controls from '../common';

export const ReactImageCropContainer = ({ imageURL }) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

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

  return (
    <div>
      {Boolean(imageURL) && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => {
            setCompletedCrop(c);
          }}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imageURL}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            width="600px"
          />
        </ReactCrop>
      )}
      <Controls zoom={scale} setZoom={setScale} rotation={rotate} setRotation={setRotate} />
      <div>{previewSrc && <img alt="Crop preview" src={previewSrc} width="600px" />}</div>
    </div>
  );
};
