import React from 'react';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  link: {
    color: '#555',
    margin: 2,
    height: 8,
    width: 8,
    "&:hover, &:focus": {
      color: '#333'
    }
  }
}));

export function Footer() {
  const classes = useStyles();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Made with &#9829;<br />
      Copyright &#169; Kaian {new Date().getFullYear()}.<br />
      <a href="https://github.com/caipng" className={classes.link} target="_blank" rel="external"><GitHubIcon fontSize="small" /></a>
      <a href="mailto:caikaian@comp.nus.edu.sg" className={classes.link}><EmailIcon fontSize="small" /></a>
    </Typography>
  );
}
