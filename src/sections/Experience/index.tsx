"use client"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-regular-svg-icons'
import { WEB_EXPERIENCE } from '../../consts'
import Carousel from '../../components/Carousel'
import '../../libs/font-mfizz-2.4.1/font-mfizz.css'
import './styles.css'
interface ExperienceType {
  enable: boolean
}
const Experience = ({ enable }: ExperienceType) => { 
  if ( !enable ) return null
  return (
    <section className="Experience">
      <Container fluid>
        <Row className="justify-content-center">
          <Col className="header">
            <FontAwesomeIcon icon={ faCompass } />
            <h3>Experiences</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Carousel
              carouselData={WEB_EXPERIENCE}
              type='experience'
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Experience