import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand className='cursor' onClick={() => { navigate('/') }}>Go Deliver</Navbar.Brand>
                <Navbar.Toggle />

                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link className='cursor' onClick={() => { navigate('/pedidos') }}>Pedidos</Nav.Link>
                        <Nav.Link className='cursor' onClick={() => { navigate('/importacao') }}>Importação</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}