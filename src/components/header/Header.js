import './header.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedUser, logout } from '../../utils/http-utils/user-requests';

export function Header() {
    const loggedUser = getLoggedUser();
    const carUrl = `/cars/${loggedUser.id}`;
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout().then(() => {
            navigate('/login');
        });
    }

    const getAdminControls = () => {
        if (loggedUser.role === "admin") {
            return (
                <>
                <Link className='nav-link' to="/user/create">Add customer</Link>
                </>
            );
                
        }
    }

    return (
        <div className="header">
            <Navbar bg="dark" expand="lg" variant='dark'>
                <Container>
                    <Navbar.Brand href="#home">Car Rental Company</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='nav-link' to="/users-list">Customers</Link>
                        <Link className='nav-link' to="/cars-list">All Cars</Link>
                        <Link className='nav-link' to={carUrl}>My cars</Link>                
                <Link className='nav-link' to="/car/create">Add a car</Link>
                        { getAdminControls() }
                        
                    </Nav>
                    <span className='nav-link logout-btn' onClick={logoutHandler}>Logout</span>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}