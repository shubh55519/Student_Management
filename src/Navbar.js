import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Navbar bg="success" expand="lg">
            <Navbar.Brand><Link to='/' className={{ color: 'black' }}>Home</Link></Navbar.Brand>
            {/* <Navbar.Brand><Link to='/form' className={{ color: 'black' }}>Form</Link></Navbar.Brand> */}
        </Navbar>
    )
}

export default Header;
