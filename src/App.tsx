import React from 'react';
import './App.css';


import { CatFactProvider } from "./context/catFacts/cat-facts-context";
import { CatFacts } from './components/catFacts/cat-facts';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <CatFactProvider>
          <CatFacts />
        </CatFactProvider>
      </div>
    </div>
  );
}

export default App;
