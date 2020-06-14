import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import COLUMNS from './columns.json';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1000,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  filter: {
    marginTop: 30,
  }
}));

export default function Tokenizer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={COLUMNS}
        getOptionLabel={(option) => option.title}
        value={props.value}
        filterSelectedOptions
        onChange={props.onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Filters"
            placeholder="Traits"
          />
        )}
      />
    </div>
  );
}
