export interface CarouselTypes {
  carouselData: CarouselData[],
  type: string,
}

export interface CarouselData {
  header?: string, 
  location?: string, 
  year?: string,
  content?: string,
  title?: string,
  desc?: string, 
  tech?: CarouselTechObject[],
  img?: string,
}

export interface CarouselTechObject {
  tag: string,
  name: string
}