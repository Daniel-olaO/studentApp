import {React, useState, useEffect} from 'react';
import {Card, Row, Container, Accordion, Button} from 'react-bootstrap';
import Loading from './Loading';
import CourseForm from './CourseForm';
import Cookies from 'universal-cookie';
import '../App.css';

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

function deleteCourse(code) {
  const cookies = new Cookies();
  const baseUrl = process.env.API_BASE_URL || 'http://localhost:8000';
  return fetch(`${baseUrl}/api/courses/deleteCourse${code}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${cookies.get('token')}`,
    },
    method: 'DELETE',
  })
      .then((data) => data.json())
      .catch((err)=>console.log(err));
};


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    getCourses()
        .then((data) => {
          setCourses(data);
          setLoading(false);
        },
        )
        .catch((err)=>console.log(err));
  }, []);
  const handleClick = async (code) => {
    const response = await deleteCourse(code);
    if (response) {
      alert('deleted');
    } else {
      alert('not deleted');
    }
  };

  if (loading) {
    return <Loading loadingMessage="Courses' data"/>;
  } else {
    return (
      <Container>
        <Row>
          {
            courses.map((course) =>(
              <Accordion defaultActiveKey="0" key={course.code}>
                <Accordion.Item>
                  <Accordion.Header>
                    {course.code}: {course.name}
                    <Button variant="danger"
                      onClick={
                        ()=>handleClick(course.code)
                      }
                    >
                      Delete
                    </Button>
                  </Accordion.Header>
                  <Accordion.Body>
                    <h5>Professor: {course.professor}</h5>
                    <h5>Program: {course.program}</h5>
                    <h5>Description:</h5>
                    <p>{course.description}</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          }
          {courses.length === 0 &&(
            <Card>
              <Card.Body>
                <Card.Body>no courses found...</Card.Body>
              </Card.Body>
            </Card>
          )}
          <CourseForm />
        </Row>
      </Container>
    );
  }
};

export default Courses;
