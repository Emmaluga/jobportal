import React from 'react'
import  Container from 'react-bootstrap/esm/Container'
import   Row from 'react-bootstrap/esm/Row'
import  Col from 'react-bootstrap/esm/Col'
import Lottie from "lottie-react"
import animationData from "../assets/animation_lnc2mlps.json"
//  import animationData from "../assets/animation_lnc2rp2t.json"


const Hero = () => {
  return (
    <div className='hero'>
        <Container>
        <Row className='bg- d-flex mt- ' style={{justifyContent: 'space-around', padding: "100px 0"}} >
        <Col md={5} className='mt-4' style={{}}>
        <div className="hero-text text-center" >
                 <h1 className='' style={{}}> Express Banking on the <span className='' style={{color: "white" }}>go!</span></h1>
                 <p className='para mt-3' style={{fontSize: 20}}>Pay connect is an online bank that offers fast, efficient 
                  banking services for individuals as well as businesses. Pay connect offers seamless banking accross Africa with 
                  easy integrations  and affiliations with top forign banks. </p>
               
                 <button className='mx-1 nt-1 hero-btn' style={{borderRadius: "20px 20px", padding: "10px 30px"}}> Sign-In</button> 
                 <button className='mx-1 nt-1 hero-btn' style={{borderRadius: "20px 20px", padding: "10px 30px"}}> Login</button> 
                
              </div>
        
        </Col>

        <Col md={5} className='bg- mt-3'>
        <div className="hero-img">
     
        <Lottie animationData={animationData} />
         
        </div>
        </Col>
       </Row>
        </Container>
      
    </div>
  )
}

export default Hero
