import React from 'react';
import styles from './App.module.css';
import SearchContainer from '../SearchContainer/SearchContainer';

const App = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <SearchContainer />
    </div>
  </div>
);

export default App;
