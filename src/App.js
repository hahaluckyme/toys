import ReactGA from 'react-ga';

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tokenizer from './Tokenizer.js';
import Table from './Table.js';
import { makeStyles } from '@material-ui/core/styles';
import COLUMNS from './columns.json';

const useStyles = makeStyles((theme) => ({
  contents: {
    width: 1000,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

const DEFAULT_VALUE = [];

ReactGA.initialize('UA-162934767-2');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  const classes = useStyles();
  const match = window.location.search.match(/filters=(\[[\d,]+\])/);
  let defaultValue = DEFAULT_VALUE;
  if (match) {
    defaultValue = JSON.parse(match[1]).map(index => COLUMNS[index]);
  }
  const [filters, setRawFilters] = React.useState(defaultValue);

  const setFilters = (newFilters) => {
    setRawFilters(newFilters);

    const urlFilters = newFilters.map(filter => COLUMNS.findIndex(column => column.title === filter.title)).sort();
    if (newFilters.length !== 0) {
      window.history.pushState(urlFilters, 'Title', `/?filters=${encodeURI(JSON.stringify(urlFilters))}`);
    } else {
      window.history.pushState(urlFilters, 'Title', `/`);
    }
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

  return (
    <div className="App">
      <div className={classes.contents}>
        <Tokenizer value={filters} onChange={(e, value) => {
          setFilters(value);
        }} />
        <Table filters={filters} onRowClick={(e, rowName) => {
          if (filters.find(filter => filter.title === rowName)) {
            setFilters(filters.filter(filter => filter.title !== rowName));
          } else {
            const filter = COLUMNS.find(filter => filter.title === rowName);
            setFilters([...filters, filter]);
          }
        }} />
      </div>
    </div>
  );
}

export default App;
