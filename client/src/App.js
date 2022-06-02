// Import dependencies
import React from 'react';
import { Outlet } from "react-router-dom";
import withContext from './components/Context';
import Header from './components/Header';


function App() {
  //  `withContext` method to provide context methods and values to `Header` component
  const HeaderWithContext = withContext(Header);
  return (
    <>
      <HeaderWithContext />
        <main>
          <Outlet />
        </main>
    </>
  );
}

export default App;
