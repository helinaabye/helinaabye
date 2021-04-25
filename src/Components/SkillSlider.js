import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
  box: {
    margin: "2px",
  },
  marker: {
    height: "15px",
    backgroundColor: "#2fa6ee"
  },
  base: {
    height: "15px",
    backgroundColor: "#eeeeee"
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 37,
  },
  {
    value: 100,
  },
];

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  }
})(Slider);


function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

export default function SkillSlider() {
  const classes = useStyles();

  return (
      <Grid container spacing={2}>
        <Grid item container xs={12} sm={6}>
          <Typography gutterBottom>Communication</Typography>
          <Grid item xs={11} className={classes.marker}></Grid>
          <Grid item xs={1} className={classes.base}></Grid>
          {/* <IOSSlider aria-label="communication" value={90} marks={marks} valueLabelDisplay="on" /> */}
       
        </Grid>
     
        <Grid item container xs={12} sm={6}>
          <Typography gutterBottom>Team Work</Typography>          
          <Grid item xs={10} className={classes.marker}></Grid>
          <Grid item xs={2} className={classes.base}></Grid>
           {/*<IOSSlider aria-label="team work" value={80} marks={marks} valueLabelDisplay="on" />*/}
    
        </Grid>
        <Grid item container xs={12} sm={6}>
          <Typography gutterBottom>Fast Learner</Typography>  
          <Grid item xs={10} className={classes.marker}></Grid>
          <Grid item xs={2} className={classes.base}></Grid>
          {/* <IOSSlider aria-label="team work" value={80} marks={marks} valueLabelDisplay="on" /> */}
       
        </Grid>
       
        <Grid item container xs={12} sm={6}>
          <Typography gutterBottom>Delivery</Typography>  
          <Grid item xs={11} className={classes.marker}></Grid>
          <Grid item xs={1} className={classes.base}></Grid>
          {/* <IOSSlider aria-label="delivery" value={90} marks={marks} valueLabelDisplay="on" /> */}
       
        </Grid>
      </Grid>  
  );
}
