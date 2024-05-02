import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard } from '@fortawesome/free-regular-svg-icons'
import Carousel from '../../components/Carousel'
import './styles.css'
import { CERTIFICATE } from '../../consts'

const Certificate = () => {
  return (
    <section className="certificate">
      <Container fluid>
        <Row className="justify-content-center">
          <Col className="header">
            <FontAwesomeIcon icon={ faIdCard } />
            <h3>Certificates</h3>
          </Col>
        </Row>
        <Row>
          <Col className="carousel">
            <Carousel
              carouselData={CERTIFICATE}
              type='certificate'
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Certificate