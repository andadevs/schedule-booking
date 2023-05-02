import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./style.scss";

const NavbarToolbar = () => {
    return (
        <Navbar bg="light" variant="light" className='navbar-header'>
            <Container>
                <Navbar.Brand href="">Booking App</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Built with love by: <a target='_blank' href="https://github.com/boykland">@boykland</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarToolbar