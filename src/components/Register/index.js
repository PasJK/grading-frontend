import './Register.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';

function Register() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState('');
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[name, setName] = useState('');
  const[mobile, setMobile] = useState('');
  const[birthday, setBirthday] = useState(new Date);
  const apiEndpoint = process.env.REACT_APP_API_END_POINT;

  const callAxios = async (formData) => {

    try{
      await axios.post(`${apiEndpoint}/register`, { formData })
      alert('Register Success!');
      navigate('/login');

    } catch (error) {
      return setErrors({'username': 'Username is already.'});
    }
  }

  const onSubmit = () => {
    setErrors('');
    const birthdayFormat = dayjs(birthday).format('YYYY-MM-DD');

    if (username === '') {
      return setErrors({'username': 'Please enter username.'});
    }

    if (username.length <= 3) {
      return setErrors({'username': 'Username must be more than 3 character.'});
    }

    if (password === '') {
      return setErrors({'password': 'Please enter password.'});
    }

    if (password.length <= 3) {
      return setErrors({'password': 'Password must be more than 3 character.'});
    }

    if (name === '') {
      return setErrors({'name': 'Please enter name.'});
    }

    if (birthday === '') {
      return setErrors({'birthday': 'Please enter birthday.'});
    }

    const formData = {
      username,
      password,
      name,
      mobile,
      birthday: birthdayFormat,
    }

    callAxios(formData);
  }

  return (
    <>
    <div className="Register-header">
     <b> R E G I S T E R </b>
    </div>
    <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={5}>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Username</Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </Col>
                {errors.username && <Form.Text className="form-validate">{errors.username}</Form.Text>}

              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label sm={2}>
                  Password
                </Form.Label>
                <Col>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </Col>
                {errors.password && <Form.Text className="form-validate">{errors.password}</Form.Text>}

              </Form.Group>

              <Form.Group className="mb-3" controlId="name">
                <Form.Label sm={2}>
                  Name
                </Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                </Col>
                {errors.name && <Form.Text className="form-validate">{errors.name}</Form.Text>}

              </Form.Group>

              <Form.Group className="mb-3" controlId="mobile">
                <Form.Label sm={6}>
                  Mobile
                </Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="Mobile" onChange={(e) => setMobile(e.target.value)}/>
                </Col>

              </Form.Group>

              <Form.Group className="mb-3" controlId="birthday">
                <Form.Label sm={6}>
                  Birthday
                </Form.Label>
                <Col>
                <DatePicker 
                selected={birthday} 
                onChange={(date) => setBirthday(date)} 
                dateFormat="yyyy-MM-dd"
                className="form-control"
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={50}
                scrollableYearDropdown
                />
                </Col>
                {errors.birthday && <Form.Text className="form-validate">{errors.birthday}</Form.Text>}

              </Form.Group>

              <Form.Group className="mb-3">
                <Col>
                  <ButtonGroup aria-label="Basic">
                    <Button className="me-3" variant="outline-secondary" onClick={() => {navigate("/login")}}> Back </Button>
                    <Button  variant="outline-success" type="button" onClick={onSubmit}>Submit</Button>
                  </ButtonGroup>
                </Col>
              </Form.Group>

            </Form>
          </Col>
        </Row>
    </Container></>
  );
}

export default Register;
