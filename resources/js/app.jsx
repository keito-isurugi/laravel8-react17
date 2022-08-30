require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Example from './components/Example';
import About from "./components/About";
import { Main } from './components/Main';

const App = () => {
  return (
    <BrowserRouter>
      <Link to="/">Example</Link>
      <Link to="/example">Example</Link>
      <Link to="/about">About</Link>
      <Link to="/todo">Todo</Link>
      <Routes>
        <Route path="/" element={<Example/>} />
        <Route path="/example" element={<Example/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/todo" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
};

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}