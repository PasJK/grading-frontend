import './Grading.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

function Grading() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState('');
  const [score, setScore] = useState('');
  const [grade, setGrade] = useState('#');
  const apiEndpoint = process.env.REACT_APP_API_END_POINT;
  const gradeBadge = {
    'A': 'success',
    'B': 'primary',
    'B+': 'primary',
    'C': 'warning',
    'C+': 'warning',
    'D+': 'secondary',
    'D': 'secondary',
    'F': 'danger',
  }


  const callAxios = async (formData) => {
    const {status, data} = await axios.get(`${apiEndpoint}/grade`, 
    {
      params: {
        score
      }
    });

    if (status !== 200) {
      setErrors({error: 'Something went wrong!.'});
    }

    const { grade } = data;

    setGradeResponse(grade);
  }

  const setGradeResponse = (grade) => {
    setGrade(grade)
  }

  const sendScore = () => {

    setErrors('');

    if (score === '') {
      return setErrors({error: 'Please enter your score.'});
    }

    if (score > 100) {
      return setErrors({error: 'Score must be between 0 - 100'});
    }

    const formData = {
      score,
    }

    callAxios(formData);
  }

  const checkUserAuth = () => {
    const userId = localStorage.getItem('userId')

    if (!userId) {
      navigate('/login')
    }

  }

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    checkUserAuth();
  }, [])

  return (
    <>
    <div className="Register-header">
     <b> G R A D I N G </b>
    </div>
    <Container>
        <Row className="justify-content-md-center text-center">
          <Col xs={12} md={5}>
            <h1 className='Grade-size'> 
              <Badge bg={gradeBadge[grade]}>{grade}</Badge>
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
        <Col xs={12} md={5}>
          <Form>
            <Form.Group className="mb-3" controlId="score">
              <Form.Control type="number" placeholder="Input your score." onChange={(e) => setScore(e.target.value)} min="1" max="100" />
              {errors.error && <Form.Text className="form-validate">{errors.error}</Form.Text>}
            </Form.Group>
          </Form>
        </Col>
        </Row>

        <Row className="justify-content-md-center text-center">
        <Col xs={12} md={5}>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" size="lg" onClick={sendScore}>
                Send !
              </Button>
              <Button variant="outline-success"size="lg"  onClick={() => {navigate(`/profile`)}}>
                Profile
              </Button>
              <Button variant="outline-dark" size="lg"  onClick={logout}>
                Logout
              </Button>
            </div>
          </Col>
        </Row>
    </Container></>
  );
}

export default Grading;
