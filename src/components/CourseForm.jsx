import {React, useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import AlertBox from './AlertBox';


async function addCourse(course) {
  const cookies = new Cookies();
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:8080';
  return fetch(`${baseUrl}/api/courses/addCourse`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${cookies.get('token')}`,
    },
    method: 'POST',
    body: JSON.stringify(course),
  })
      .then((data)=> data.json());
}
const StudentForm = () => {
  const [show, setShow] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [program, setProgram] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) =>{
    e.preventDefault();

    const response = await addCourse({
      code,
      name,
      professor,
      program,
      description});

    if (response.ok) {
      alert('Course Added!');
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
      <Button variant="primary" onClick={handleShow}>Course Entry Form</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Entry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showMessage && <AlertBox message={message}/>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Code:</Form.Label>
              <Form.Control type="text"
                placeholder="CSC101"
                value={code}
                onChange={(e)=>setCode(e.target.value)} autoFocus required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text"
                placeholder="name..."
                value={name}
                onChange={(e)=>{
                  setName(e.target.value);
                }} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Professor:</Form.Label>
              <Form.Control type="text"
                placeholder="Professor"
                value={professor} onChange={(e)=>{
                  setProfessor(e.target.value);
                }} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Program:</Form.Label>
              <Form.Control type="text" placeholder="ABC"
                value={program} onChange={(e)=>{
                  setProgram(e.target.value);
                }} required/>
            </Form.Group>
            <Form.Group className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={description} onChange={(e)=>{
                  setDescription(e.target.value);
                }} required/>
            </Form.Group>
            <Button variant="primary" type="submit">Add Course</Button>
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
