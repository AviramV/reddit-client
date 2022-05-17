import Header from './Components/header/Header';
import Posts from './Components/posts/Posts';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import ErrorMessage from './Components/errorMessage/errorMessage';

function App() {
  return (
    <>
      <Header />
      <main className="App">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="search" element={<Posts />} />
          <Route path="category/:categoryName" element={<Posts />} />
          <Route path="*" element={<ErrorMessage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
