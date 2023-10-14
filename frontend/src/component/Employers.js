import React from 'react'
import  Container from 'react-bootstrap/esm/Container'
import   Row from 'react-bootstrap/esm/Row'
import  Col from 'react-bootstrap/esm/Col'
import Lottie from "lottie-react"
import animationData from "../assets/animation_lnc2w8gm.json"



const Employers = () => {

  return (

    <div className='employers'>

     <Container>

     <Row className='d-flex' style={{justifyContent: 'space-around'}}>
     <Col md={6} className=''>

        <div className="employers-text mt-5">
        <h1>Attract the best minds for your tasks</h1>
        <button>sign-up</button>
        <button>sign-up</button>
        </div>

     </Col>

     <Col md={6} className=''>

        <div className="employers-image">
            <Lottie animationData={animationData}  />
        </div>

     </Col>
     </Row>

     </Container>
      
    </div>
  )

}

export default Employers
