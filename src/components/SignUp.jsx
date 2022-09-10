import {React, useState} from 'react';
import {Container, Row, Form, Button, Alert} from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom';
import AlertBox from './AlertBox';
import '../App.css';

function signUp(user) {
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:8000';
  return fetch(`${baseUrl}/api/users/signUp`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  })
      .then((data) => data.json())
      .catch((err)=>console.log(err));
}


const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signUp({username, email, password, rePassword});
    if (response.username) {
      setMessage('Successfully signed up!');
      navigate('/');
    } else {
      setMessage(response.message);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
    setUsername('');
    setEmail('');
    setPassword('');
    setRePassword('');
  };


  return (
    <Container>
      <Row>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="login-input">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text"
              name="username"
              placeholder='UserName'
              value={username}
              onChange={(e)=>{
                setUsername(e.target.value);
              }
              } />
          </Form.Group>
          <Form.Group className="login-input">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"
              name="email"
              placeholder='Email'
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value);
              }
              } />
          </Form.Group>
          <Form.Group className="login-input">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
              name="password"
              placeholder='Password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group className="login-input">
            <Form.Label>Re-Password</Form.Label>
            <Form.Control type="password"
              name="rePassword"
              placeholder='Re-Password'
              value={rePassword}
              onChange={(e)=>setRePassword(e.target.value)}/>
          </Form.Group>
          <Button
            variant="primary"
            className="btn"
            type="submit">Sign Up</Button>
        </Form>
        {showMessage && <AlertBox message={message}/>}
        <h5>Already have an account? <Link to ='/'>click here</Link></h5>
      </Row>
    </Container>
  );
};

export default SignUp;
