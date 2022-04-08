import Header from './Components/header/Header';
import Posts from './Components/posts/Posts';
import Loader from './Components/loader/Loader';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="App">
      <Posts />
      </main>
    </>
  );
}

export default App;
