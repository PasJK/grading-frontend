import './Login.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const apiEndpoint = process.env.REACT_APP_API_END_POINT;

  const callAxios = async (formData) => {
    try {
      const { data } = await axios.post(`${apiEndpoint}/login`, { formData })
      const dataObject = JSON.parse(data);
      const { id } = dataObject;

      localStorage.setItem("userId", id);
      navigate('/grading');
      
    } catch (error) {
      return setErrors({'form': 'Invalid username or password'});
    }
  }

  const login = () => {

    setErrors('');

    if (username === '' || password === '') {
      return setErrors({'form': 'Please enter your username and password.'});
    }

    if (password.length <= 3) {
      return setErrors({'formPassword': 'Password must be more than 3 character.'});
    }

    const formData = {
      username,
      password,
    }

    callAxios(formData);
  }


  useEffect(() => {
    localStorage.clear();
  }, [])

  return (
    <>
    <div className="Login-header">
     <b> L O G I N </b>
    </div>
    <Container>
        <Row className="justify-content-md-center">
        <Col xs={12} md={5}>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
              type="email"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              />
            {errors.form && <Form.Text className="form-validate">{errors.form}</Form.Text>}

            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              {errors.form && <Form.Text className="form-validate">{errors.form}</Form.Text>}
              {errors.formPassword && <Form.Text className="form-validate">{errors.formPassword}</Form.Text>}

            </Form.Group>
            <Form.Group as={Row} className="mb-3">
            <Col xs={5}>
              <ButtonGroup aria-label="Basic example">
                <Button className="me-3" variant="outline-secondary" onClick={() => {navigate("/register")}}> Register </Button>
                <Button variant="outline-primary" type="button" onClick={login}>Login</Button>
              </ButtonGroup>
            </Col>
          </Form.Group>
          </Form>
        </Col>
        </Row>
    </Container></>
  );
}

export default Login;
