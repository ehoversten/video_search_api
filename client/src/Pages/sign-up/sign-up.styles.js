import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {},
  paperContainer: {
    padding: '1rem',
  },
  form: {
    width: '100%',
  },
  formControl: {
    maxWidth: '420px',
  },
  customMargin: {
    margin: `${theme.spacing(1)}px !important`,
  },
}));

export default useStyles;
