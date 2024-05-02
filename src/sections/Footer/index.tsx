"use client"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { LINKEDIN_LINK, EMAIL } from '../../consts'
interface FooterType {
  enable: boolean
}
const Footer = ({ enable }: FooterType) => { 
  if ( !enable ) return null
  return (
    <section className="Footer">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs="auto" lg="4">
            <a href={`mailto:${EMAIL}`} ><FontAwesomeIcon icon={faEnvelope } /></a>
            <a href={LINKEDIN_LINK} target="_blank"><FontAwesomeIcon icon={ faLinkedinIn } /></a>
          </Col>
          <Col lg="4">
      
          </Col>
          <Col xs="auto" lg="4">
            <p>&copy; Ryutaro Matsuda. All Right Recieved. </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Footer