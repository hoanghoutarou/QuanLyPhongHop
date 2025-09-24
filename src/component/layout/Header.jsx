import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faClock, faGear, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";

function Header({...props}) {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const handleOpen = () => setShowMenu(true);
  const handleClose = () => setShowMenu(false);

  return(
    <>
    <Navbar className="bg-header" bg="light" data-bs-theme="light" fixed="top">
        <Container>
          <Navbar.Brand>Meeting Room</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link className="menu-navbar" style={{color: "black", textDecoration:"none", fontFamily:"20px"}} to="/">Trang chủ</Link></Nav.Link>
            <Nav.Link><Link className="menu-navbar" style={{color: "black", textDecoration:"none", fontFamily:"20px"}}>Các mẫu phòng</Link></Nav.Link>
            <Nav.Link><Link className="menu-navbar" style={{color: "black", textDecoration:"none", fontFamily:"20px"}}>Danh sách phòng</Link></Nav.Link>
          </Nav>
           <Nav className="nav navbar-nav navbar-right">
            <Nav.Link><Link className="nav-item" style={{color: "black", textDecoration:"none", fontFamily:"20px"}}
            onClick={(e) => {
            e.preventDefault();
            props.handleNotification();
    }}><FontAwesomeIcon icon={faBell} className="text-danger"></FontAwesomeIcon></Link></Nav.Link>
            <Nav.Link onClick={handleOpen}><Link style={{color: "black", textDecoration:"none", fontFamily:"20px"}}><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></Link></Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      {location.pathname === '/' && (
        <Offcanvas className="menu-sidebar d-flex flex-column" placement="end" show={showMenu} onHide={handleClose} {...props}>
        <Offcanvas.Header className="justify-content-start" closeButton>
         </Offcanvas.Header>
         <Nav className="d-flex flex-column">
            <Nav.Link><Link className="nav-item" style={{color: "black", textDecoration:"none", fontFamily:"20px"}}><FontAwesomeIcon icon={faClock}></FontAwesomeIcon>Lịch sử đặt phòng</Link></Nav.Link>
            <Nav.Link><Link className="nav-item" style={{color: "black", textDecoration:"none", fontFamily:"20px"}}><FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>Tin nhắn</Link></Nav.Link>
            <Nav.Link><Link className="nav-item" style={{color: "black", textDecoration:"none", fontFamily:"20px"}}><FontAwesomeIcon icon={faGear}></FontAwesomeIcon>Setting</Link></Nav.Link>
          </Nav>
           <div style={{flexGrow: 1}}></div>
          <br />
          <Nav className="mt-auto" >
            <Nav.Link><Link className="nav-item" style={{color: "black", textDecoration:"none", fontFamily:"20px"}}><FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>Đăng xuất</Link></Nav.Link>
          </Nav>
      </Offcanvas>
      )}
    </>
  )
}
export default Header;