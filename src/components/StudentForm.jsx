import {React, useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import AlertBox from './AlertBox';
import '../App.css';

function addStudent(student) {
  const cookies = new Cookies();
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:8000';
  return fetch(`${baseUrl}/api/students/addStudent`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${cookies.get('token')}`,
    },
    method: 'POST',
    body: JSON.stringify(student),
  })
      .then((data)=> data.json());
}
const StudentForm = () => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) =>{
    e.preventDefault();

    const response = await addStudent({
      firstName,
      lastName,
      email,
      phone,
      program,
    });
    console.log(response);
    if (response.status === 201) {
      alert('Student Added!');
    } else {
      setMessage(response.message);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  return (
    <>
      <Button variant="primary" className='modal-btn'
        style={{width: '66%', margin: 'auto', marginTop: '10px'}}
        onClick={handleShow}>Add Student</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Entry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showMessage && <AlertBox message={message}/>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name:</Form.Label>
              <Form.Control type="text"
                placeholder="FirstName"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                autoFocus required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control type="text"
                placeholder="LatName"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="text"
                placeholder="name@example.ca" value={email} onChange={(e)=>{
                  setEmail(e.target.value);
                }} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone:</Form.Label>
              <Form.Control type="tel"
                placeholder="111-234-5678"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Program:</Form.Label>
              <Form.Control type="text"
                placeholder="ABC"
                value={program}
                onChange={(e)=>setProgram(e.target.value)} required/>
            </Form.Group>
            <Button variant="primary" type="submit">Add Student</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentForm;
