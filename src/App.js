import React from 'react';
import './App.css';
import DataFetching from "./Components/DataFetching"

function App() {
  return (
    <div className="App">
      <h1 style={{color: 'white', marginTop: 15}}>Free charge Assignment</h1>
      <div style={{marginTop: 25}}>
        <DataFetching />
      </div>
    </div>
  );
}

export default App;
