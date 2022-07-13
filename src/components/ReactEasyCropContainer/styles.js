export const styles = (theme) => ({
  cropArea: {},
  cropContainer: {
    position: 'relative',
    height: 200,
    width: 600,
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
  },
  sliderLabel: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 65,
    },
  },
  btnContainer: {
    display:
      'flex' /* eslint-disable react/jsx-props-no-spreading,no-unused-vars,no-shadow,react/prop-types */,

    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    padding: '22px 0px',
    marginLeft: 32,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px',
    },
  },
  croppedImageDiv: {
    marginTop: 10,
  },
});
