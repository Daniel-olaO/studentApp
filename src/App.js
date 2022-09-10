import './App.css';
import {React, useState, useEffect} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {Route, Routes} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Courses from './components/Courses';
import Student from './components/Student';
import NotFound from './components/NotFound';
import Students from './components/Students';
import LogIn from './components/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import Homepage from './components/Homepage';
import SignUp from './components/SignUp';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get('token')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/"
          element={
            <LogIn setIsLoggedIn={setIsLoggedIn} />
          } />
        <Route path='/signUp'
          element={
            <SignUp />
          } />

        <Route path='home'
          element={
            <ProtectedRoute isAuth={isLoggedIn}>
              <Homepage setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          }>
          <Route path='courses'
            element={
              <Courses />
            } />
          <Route path='students'
            element={
              <Students />
            } />
          <Route path='student/:id'
            element={
              <Student />
            } />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
