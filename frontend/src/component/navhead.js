import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from  'react-bootstrap/Button';
import Form from  'react-bootstrap/Form';
// import NavDropdown from 'react-bootstrap/Button';
import { FaPeopleCarry } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import image1 from "../image/image2.png"


const Navhead = ()=>  {
  const [navcolor, setnavcolor ] = useState(true)
  const [color,  setColor ] = useState(true)

    const setFunc = () => {
         if (window.scrollY > 100 ) {

            setnavcolor(false)
            setColor(false)
          
         }else{
           setnavcolor(true)
           setColor(true)
         }

        }
        
        window.addEventListener("scroll", setFunc )

  return (


    <Navbar expand="lg" className={navcolor ? "fixed-top " : " fixed-top colorread"}>
      <Container fluid>
        <Navbar.Brand className="" style={{fontSize:"2rem"}}><FaPeopleCarry className= {color ? "brand" : "brand-new"} /> <span className={color ? "logo-brand" : "logo-brand-new"}>Job List</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav

            className="m-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            
          >


          <NavLink to= "/"  className={color ? "navlink" : "navlink-new"}>Home</NavLink>
           
          <NavLink to= "/jobseekers"  className={color ? "navlink" : "navlink-new"} > Jobseekers </NavLink>
        
          <NavLink to= "/employers"  className={color ? "navlink" : "navlink-new"} > Employers </NavLink>
         

           
          </Nav>



             <Form className="d-flex" >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
           <Button varient="danger">search</Button>
          </Form>
          

    
         

          
        </Navbar.Collapse>
      </Container>
    </Navbar>

   
  );

}



export default Navhead