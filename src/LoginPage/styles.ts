import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    backgroundImage: 'url(https://source.unsplash.com/_M-DrbiNFa4)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  image: {},
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(8, 4)
  },
  paperContainer: {
    opacity: 0.98
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  logo: {
    width: 150,
    height: 150,
    'margin-bottom': 30
  },
  welcome: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    'font-weight': 600,
    'text-align': 'left',
    width: '100%',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  },
  progress: {
    position: 'absolute',
    top: 0,
    'z-index': 1500,
    width: '100%'
  }
}));

export default useStyles;
