"use client"
import React, { useState } from 'react'
import RBCarousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "bootstrap/dist/css/bootstrap.min.css";
import '../../libs/font-mfizz-2.4.1/font-mfizz.css'
import './styles.css'
import { TYPE_OF_CONTENT } from '../../consts'
import { CarouselTypes, CarouselData } from './carousel'

interface Carousel {
  children: any
}
const Carousel = ({ carouselData, type }: CarouselTypes) => { 

  const [activeIndex, setActiveIndex] = useState(0)
  const handleSelect = (selectedIndex: number) => { 
    setActiveIndex(selectedIndex)
  }

  const getBioItem = (item: CarouselData, index: number) => (
      <RBCarousel.Item key={ `item-${index}`} > 
        <Container>
          <Row>
            <Col xs="12" className='contentContainer'>
              <h3>{ item.header }</h3>
              {
                item.location && item.year && (
                  <p>{`${item.location} ${item.year}`}</p>
                )
              }
              {
                item.content && (
                  <p>{ item.content }</p>
                )  
              }
            </Col>
          </Row>
        </Container>
      </RBCarousel.Item>
  )

  const getExperienceItem = (data: CarouselData, index: number) => (
    <RBCarousel.Item key={ `item-${index}`} > 
        <Container className="contentContainer">
          <Row>
            <Col xs="12">
              <h3>{ data.title }</h3>
            {data.desc && (
              <p>{ data.desc }</p>
            )}
          </Col>
        </Row>
        {data.tech && (
          <>
            <Row>
              <Col>
                  <h4>Technologies used:</h4>
              </Col>
            </Row>
            <Row>
              {data.tech.map((item, index) => (
                <Col className="techIcon" key={`${item.tag}-${index}`}>
                  <i className={item.tag} />
                  <p>{item.name}</p>
                </Col>
              ))
              }
            </Row>
          </>
        )}
        </Container>
      </RBCarousel.Item>
  )

  const getCertificateItem = (data: CarouselData, index: number) => {
    return (
      <RBCarousel.Item key={`item-${index}`} > 
        <Container className="contentContainer">
          <Row>
            <Col xs="12">
              <h3>{ data.title }</h3>
              {data.desc && (
                <p>{data.desc}</p>
              )}
              <div className="imageWrapper">
                <img className="certificate-image" src={`./${data.img}`} />
              </div>
            </Col>
          </Row>
        </Container>
      </RBCarousel.Item>
    )
  }

  const getCarouselItems = (carouselData: CarouselData[], type: string) => {
    if (type === TYPE_OF_CONTENT.bio) {
      return carouselData.map((data, index) => getBioItem(data, index))  
    }
    if (type === TYPE_OF_CONTENT.experience) {
      return carouselData.map((data, index) => getExperienceItem(data, index))
    }
    if (type === TYPE_OF_CONTENT.certificate) {
      return carouselData.map((data, index) => getCertificateItem(data, index))
    }
   }

  return (
    <RBCarousel
      slide={ true }
      activeIndex={activeIndex}
      onSelect={handleSelect}
      variant="dark"
    >
      { getCarouselItems(carouselData, type) }
    </RBCarousel>
  )
}

export default Carousel