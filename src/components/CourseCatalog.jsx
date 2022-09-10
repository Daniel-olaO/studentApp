import {React, useState, useEffect} from 'react';
import {Card, Modal, Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';

function getCourses() {
  const cookies = new Cookies();
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:8000';
  return fetch(`${baseUrl}/api/courses`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${cookies.get('token')}`,
    },
    method: 'GET',
  })
      .then((data) => data.json())
      .catch((err)=>console.log(err));
}
function takeCourse(studentId, courseCode) {
  const cookies = new Cookies();
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:8000';
  return fetch(
      `${baseUrl}/api/students/${studentId}/takeCourse/${courseCode}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${cookies.get('token')}`,
        },
        method: 'PUT',
      })
      .then((data) => data.json())
      .catch((err)=>console.log(err));
}
const CourseCatalog = ({studentId}) => {
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    getCourses()
        .then((data) => {
          setCourses(data);
        })
        .catch((err)=>console.log(err));
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>Take Course</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Catalog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Select a course to take</h4>
          {
            courses.map((course) =>(
              <Card key={course.code}
                onClick={()=>takeCourse(studentId, course.code)}>
                <Card.Title>
                  {course.code}
                </Card.Title>
                <Card.Body>
                  {course.courseName}
                </Card.Body>
              </Card>
            ))
          }
          {courses.length === 0 &&(
            <Card>
              <Card.Body>
                <Card.Text>no courses found..</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourseCatalog;
