import {React} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, NavDropdown ,Nav } from 'react-bootstrap';


export const HeaderTienda = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Prueba Tecnica Suric Code</Navbar.Brand>
      </Container>
    </Navbar>
  );
}