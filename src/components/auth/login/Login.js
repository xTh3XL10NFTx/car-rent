import { useState } from "react"
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../utils/http-utils/user-requests";
import './Login.scss';

export function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const onInputChange = (event) => {
        setUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        login(user).then(() => {
            navigate('/users-list');
        }).catch(error => setError(error.message))
    }

    return (
        <div className="user-form-wrapper">

            <Form onSubmit={onFormSubmit}>
                <h3>Login</h3>
                {error && <span className="text-danger">{error}</span>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={user.passsword} onChange={onInputChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <Link to='/register'>Sign up</Link>
            </Form>
        </div>
    )
}