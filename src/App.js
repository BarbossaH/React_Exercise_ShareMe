// import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import { fetchUer } from './utils/fetchUser';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUer();

    if (!user) navigate('/login');
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Home />} />
      {/* <div className="App">
        <div id="signInDiv"></div>
        {Object.keys(user).length !== 0 && (
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
        )}

        {user && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h3>{user.name}</h3>
          </div>
        )}
      </div> */}
    </Routes>
  );
}

export default App;
