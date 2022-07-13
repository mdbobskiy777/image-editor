/* eslint-disable react/jsx-props-no-spreading,no-unused-vars,no-shadow,react/prop-types */
import { useCallback, useEffect, useState } from 'react';

import { useDropzone } from 'react-dropzone';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ReactEasyCropContainer from './ReactEasyCropContainer/ReactEasyCropContainer';
import { ReactImageCropContainer } from './ReactImageCropContainer/ReactImageCropContainer';

import { styles } from './styles';

const ImageEditSection = ({ classes }) => {
  const [image, setImage] = useState(undefined);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setImage([file, URL.createObjectURL(file)]);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);
  return (
    <div className={classes.mainContainer}>
      <div className={classes.dropArea} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the files here ...</Typography>
        ) : (
          <Button variant="outlined" color="primary">
            Drag &apos;n&apos; drop some files here, or click to select files
          </Button>
        )}
      </div>
      {image && (
        <div className={classes.editorsArea}>
          <div className={classes.editorContainer}>
            <ReactEasyCropContainer imageURL={image[1]} />
          </div>
          <div className={classes.editorContainer}>
            <ReactImageCropContainer imageURL={image[1]} />
          </div>
        </div>
      )}
    </div>
  );
};

const styledImageEditSection = withStyles(styles)(ImageEditSection);

export default styledImageEditSection;
