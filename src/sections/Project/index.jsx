import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles.css'

const Project = () => {

  return (
    <section className="Project">
      <Container fluid>
        <Row className="justify-content-center">
          <Col className="header">
            <FontAwesomeIcon icon={ faLightbulb } />
            <h3>Projects</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='body'>
              <div>
                <h3>Weather Dashboard</h3>
                <p>Created at April 2024</p>
                <p>I made the weather dashbaord using weather API (https://www.weatherapi.com).</p>
                <p>The site will retrive current location or searched location's current weather and 
                  forcast for 5 day(if it still free trial left otherwise 3days). 
                </p>
                <a className='btn btn-outline-dark' href='/' target="_blank">Take Me to the Demo</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Project