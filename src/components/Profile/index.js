import './Profile.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';

function Profile() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const[username, setUsername=''] = useState('');
  const[password, setPassword=''] = useState('');
  const[name, setName=''] = useState('');
  const[mobile, setMobile=''] = useState('');
  const[birthday, setBirthday=''] = useState('');
  const apiEndpoint = process.env.REACT_APP_API_END_POINT;

  const getProfile = async (formData) => {
    const { status, data } = await axios.get(`${apiEndpoint}/profile/${userId}`, { formData })

    if (status !== 200) {
      setErrors({error: 'Something went wrong!.'});
    }

    const dataObject = JSON.parse(data);
    const {id, username, name, mobile, password, birthday} = dataObject;

    setUsername(username);
    setPassword(password);
    setName(name);
    setMobile(mobile);
    setBirthday(new Date(birthday))
    setUserId(id);
  }

  const updateProfile = async (formData) => {
    const { status } = await axios.post(`${apiEndpoint}/profile/${userId}`, { formData })

    if (status !== 200) {
      setErrors({error: 'Something went wrong!.'});
    }

    alert('Profile is up to date.');
    navigate('/profile');
  }


  const onUpdate = () => {
    setErrors('')

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
      birthday: dayjs(birthday).format('YYYY-MM-DD'),
    }

    updateProfile(formData);
  }

  const checkUserAuth = () => {
    const userId = localStorage.getItem('userId')

    if (!userId) {
      navigate('/login')
    }

  }

  useEffect(() => {
    checkUserAuth();
    getProfile();
    setErrors('');
  }, [])

  return (
    <>
    <div className="Register-header">
     <b> P R O F I L E </b>
    </div>
    <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={5}>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Username</Form.Label>
                <Col>
                  <Form.Control 
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)} 
                  value={username}
                  disabled/>
                </Col>
                {errors.username && <Form.Text className="form-validate">{errors.username}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label sm={2}>
                  Password
                </Form.Label>
                <Col>
                  <Form.Control type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  disabled/>
                </Col>
                {errors.password && <Form.Text className="form-validate">{errors.password}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="name">
                <Form.Label sm={2}>
                  Name
                </Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}  value={name}/>
                </Col>
                {errors.name && <Form.Text className="form-validate">{errors.name}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="mobile">
                <Form.Label sm={6}>
                  Mobile
                </Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="Mobile" onChange={(e) => setMobile(e.target.value)}  value={mobile}/>
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
                {errors.birthday && <Form.Text className="form-validate">{errors.birthday}</Form.Text>}
                </Col>
              </Form.Group>

              <Form.Group className="mb-3">
                <Col>
                  <ButtonGroup aria-label="Basic">
                    <Button className="me-3" variant="outline-secondary" onClick={() => {navigate("/grading")}}> Back </Button>
                    <Button  variant="outline-success" type="button" onClick={onUpdate}>Update</Button>
                  </ButtonGroup>
                </Col>
              </Form.Group>

            </Form>
          </Col>
        </Row>
    </Container></>
  );
}

export default Profile;
