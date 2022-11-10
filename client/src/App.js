import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyNavbar from './Components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Router>
      <Root />
    </Router>
  )
}

function Root() {
  return (
    <Routes>
      <Route path='/' element={<MyNavbar />}>
        {/* Outlets */}
        <Route path='' element={<h1>Homepage</h1>} />
        <Route path='hikes' element={<><h1>Hikes List by Estelle</h1></>} />
      </Route>

      {/* The following routes will NOT have the navbar */}
      <Route path='/login' element={<><h1>Login Page By Antonello</h1></>} />
      <Route path='/register' element={<><h1>Register Page By Antonello</h1></>} />

      <Route path='*' element={<><h1>Oh no! Page not found.</h1> <p>Return to our <Link to="/" >homepage</ Link>. </p></>} />
    </Routes >
  );
}

export default App;
