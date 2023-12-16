import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { CartPage } from './components/CartPage';
import { ProfilePage } from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={MainPage} />
          <Route path='/cart' Component={CartPage} />
          <Route path='/profile' Component={ProfilePage} />
          <Route path='/login' Component={LoginPage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
