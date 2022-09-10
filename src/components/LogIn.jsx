import {React, useState} from 'react';
import {Container, Row, Form, Button} from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import AlertBox from './AlertBox';
import '../App.css';


function login(user) {
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:8000';
  return fetch(`${baseUrl}/api/users/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  })
      .then((data) => data.json());
}

const LogIn = ({setIsLoggedIn}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({username, password});
    if (response.token) {
      const duration = new Date();
      duration.setTime(duration.getTime() + (1 * 60 * 60 * 1000));
      cookies.set('token', response.token, {path: '/', expires: duration});

      localStorage.setItem('username', response.user);
      setIsLoggedIn(true);
      navigate('/home/students');
    } else {
      console.log(response);
      setMessage(response.message);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
    setUsername('');
    setPassword('');
  };

  return (
    <Container className='container'>
      <Row>
        <h1>Log In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="login-input">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text"
              name="username"
              placeholder='UserName'
              value={username}
              onChange={(e)=>{
                setUsername(e.target.value);
              }} />
          </Form.Group>
          <Form.Group className="login-input">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password"
              name="password"
              placeholder='Password'
              value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary"
            className="btn"
            type="submit">Login</Button>
        </Form>
        {showMessage && <AlertBox message={message} />}
        <h5>
          New to Student App?
          <Link to='/signUp'>
             Create an Account
          </Link>
        </h5>
      </Row>
    </Container>
  );
};

export default LogIn;
