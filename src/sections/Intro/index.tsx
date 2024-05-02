"use client"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LATEST_WORK } from '../../consts'
import './styles.css'
interface IntroType {
  enable: boolean
}

const Intro = ({ enable }: IntroType) => { 
  if ( !enable ) return null
  return (
    <section className='Intro'>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={12}>
            <div className='crest_wrapper'>
              <div className='crest'>
                <div className='inner_crest'>
                  <h1>{LATEST_WORK.name}</h1>
      						<h4>{LATEST_WORK.title}</h4>
      						<p>At</p>
      						<h3>{LATEST_WORK.company}</h3>
      						<p>Since</p>
      						<h3>{LATEST_WORK.year}</h3>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Intro

