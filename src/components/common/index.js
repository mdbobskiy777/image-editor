/* eslint-disable react/jsx-props-no-spreading,no-unused-vars,no-shadow,react/prop-types */
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

const Controls = ({ classes, zoom, setZoom, rotation, setRotation }) => (
  <div className={classes.controls}>
    <div className={classes.sliderContainer}>
      <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
        Zoom
      </Typography>
      <Slider
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        aria-labelledby="Zoom"
        classes={{ root: classes.slider }}
        onChange={(e, zoom) => setZoom(zoom)}
      />
    </div>
    <div className={classes.sliderContainer}>
      <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
        Rotation
      </Typography>
      <Slider
        value={rotation}
        min={0}
        max={360}
        step={1}
        aria-labelledby="Rotation"
        classes={{ root: classes.slider }}
        onChange={(e, rotation) => setRotation(rotation)}
      />
    </div>
  </div>
);

export default withStyles(styles)(Controls);
