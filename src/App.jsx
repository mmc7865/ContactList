import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Create from './components/Create';
import Home from './components/Home';
import Edit from './components/Edit';
import PostContext from './context/postContext';

const App = () => {
  return (
    <PostContext>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </PostContext>
  );
}

export default App;
