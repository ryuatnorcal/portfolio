interface LATEST_WORK_TYPE {
  name: string,
  title:  string,
  company: string,
  year: string
}

interface SET_OF_BIO_TYPE {
  sec:string,
  category: string,
  header: string,
  content: string,
  location?: string,
  year?: string,
  role?: string
}

interface EXPERIENCES_TYPE {
  sec: string,
  theme?: string,
  title?: string,
  name?: string,
  img?: string,
  url?: MOBILE_EXPERIENCES_URL_TYPE,
  desc: string,
  year?: string,
  tech?: Tech[]
}
interface CERTIFICATE_TYPE {
  title?: string,
  desc?: string,
  img?: string,
  date?: string
}

interface MOBILE_EXPERIENCES_URL_TYPE {
  ios: string,
  android: string,
  web: string
}

interface Tech {
  name: string,
  tag: string
}

interface TYPE_OF_CONTENT_TYPE {
  certificate: string,
  experience: string,
  bio: string
}

interface FEATURE_FLAGS_TYPE {
  enableIntro: boolean,
  enableBio: boolean,
  enableTech: boolean,
  enableFooter: boolean,
  enableExperience: boolean
}

export const LATEST_WORK: LATEST_WORK_TYPE = {
  name: 'Ryutaro Matsuda',
  title:  'Sr Front End Developer',
  company: 'Telus Digital',
  year: '2021 - 2024'
}

export const SET_OF_BIO: SET_OF_BIO_TYPE[] = [
  {
    sec:'bio',
    category: 'intro',
    header: 'Bio',
    content: 'My name is Ryutaro Matsuda. I immigrated from Japan to the United States to pursue my dream of becoming a software engineer. I earned my Bachelor of Science in computer science at California State University, East Bay in 2015. Since graduating, I have developed various projects; React Web Apps, API development for mobile apps,, Angular JS, and React applications and more. I have been fortunate in my early career to have learned my techniques, work cultures, and solutions through the projects. My career experience includes working with start-ups as well as a Fortune 500 company. I am familiar with and excel working in a fast-paced development environment and as part of a team.'
  },
  {
    sec:'bio',
    category: 'history',
    header: 'Sr Frontend Developer at Telus Digital',
    location: 'Vancouver BC/Calgary AB Canada',
    year: '2021 - 2024',
    role: 'FTE',
    content: 'As a senior front-end developer, I have developed a client-facing eCommerce website for telus.com including OptikTV, internet, and a home security page. We work closely with stakeholders, designers, and API teams to achieve business goals. Also, I onboarded many Jr developers and I was a beloved mentor for next-generation developers.'
  },
  {
    sec:'bio',
    category: 'history',
    header: 'Full stack developer at Glacer Media Digital',
    location: 'Vancouver BC Canada',
    year: '2019 - 2021',
    role: 'FTE',
    content: 'As React/Application Developer; I have developed a full-stack digital flyer platform. During the project, I have done scrum master and manage its dev team. There were many obstacles at the project but thanks to teamwork, we solved them and successfully released the first product with the client.'
  },
  {
    sec:'bio',
    category: 'history',
    header: 'API Developer at Contact Energy NZ',
    location: 'Auckland/Wellington NZ',
    year: '2018 - 2019',
    role: 'Contract',
    content: 'As an API Developer; I have contributed API integration part of their mobile application. While on the project, I have learned AWS architectures including serverless, Sqs, API Gateway, etc. Additionally, I have successfully collaborated with other experts, designers,s and third-party developers. I also learned solid scrum methodologies.'
  },
  {
    sec:'bio',
    category: 'history',
    header: 'Lead Frontend Engineer at U.S. Bank',
    location: 'San Francisco CA USA',
    year: '2016 - 2018',
    role: 'FTE',
    content: 'As Lead Front-end Engineer at U.S. Bank; I have developed front-end mock-up for AEM as well as major contributions for the U.S. Bank homepage and login widget. Additionally, I have contributed to U.S. Bank\'s internal website, product pages, and styling sheet libraries I worked closely with developer teams, designer teams, and clients to complete projects. This position has specifically expanded my knowledge of major methodologies for Adobe Experience Manager.'
  },
  {
    sec:'bio',
    category: 'history',
    header: 'Lead Frontend and Hybrid Mobile Developer at Emrl',
    location: 'Sacramento CA USA',
    year: '2015 - 2016',
    role: 'FTE',
    content: 'As Lead Hybrid Mobile / Full Stack Developer at Emrl; I developed iPhone and Android mobile apps using the ionic framework, and the client-side dashboard app with MEAN Stack. I updated Emrl’s task management system via Ruby on Rails. This assignment allowed me to develop skills in Ionic and Cordova development.'
  },
  {
    sec:'bio',
    category: 'history',
    header: 'Startup CTO and Developer at Booomindustries LLC',
    location: 'Oakland CA USA',
    year: '2013 - 2015',
    role: 'Volunteer',
    content: 'As CTO and Developer at Booomindustries, I have worked on a design tool for snowboard which was similar to motorola\'s phone designer with using HTML5 and JavaScripts. I was working closely with industry that builds custom desinged snowboard and other developers. However, the startup was ended before it launched to public.'
  },
  {
    sec:'bio',
    category: 'history',
    header: 'Intern Software Developer at PSP Inc',
    location: 'Bellevue WA USA',
    year: '2015 - 2015',
    role: 'Contract',
    content: 'As an Intern Software Developer at PSP Inc, I supported full-time software developers. One of my assignments was the re-development of the PSP Inc Mail Magazine product. I also developed an assignment manager for a local elementary school. This internship provided me with valuable front-end skills as well as knowledge in CakePHP.'
  }

]

export const MOBILE_EXPERIENCES: EXPERIENCES_TYPE[] = [
  {
    sec:'mobile',
    theme: "orange",
    name: 'Engine',
    img: 'engineApp',
    url:{
      ios: 'https://itunes.apple.com/us/app/engine-create-share-insightful/id1112265069',
      android: 'https://play.google.com/store/apps/details?id=com.mcorp.engine89450',
      web:'https://www.the-mcorp.com/engine/'
    },
    desc: 'As the project’s main developer, I learned and utilized ionic framework and hybrid mobile development methodology. I collaborated closely with clients and the design director to deliver products in a timely manner. I was also able to learn some of the limitations and possibilities associated with hybrid mobile apps. Furthermore, I developed a web-based dashboard for the admin of mobile app; this helped manage user information via MEAN stack.',
    year: '2015',
    tech:[
      {
        name:'NodeJS',
        tag: 'icon-nodejs'
      },
      {
        name:'Ionic',
        tag: 'icon-phone-gap'
      },
      {
        name:'AngularJS',
        tag: 'icon-angular-alt'
      },
      {
        name:'Bootstrap',
        tag: 'icon-bootstrap'
      },
      {
        name:'MongoDB',
        tag: 'icon-mongodb'
      }
    ]				
  },
  {
    sec:'mobile',
    name: 'Snowboarding App',
    img: 'snowboardingApp',
    url:{
      ios: '',
      android: '',
      web:''
    },
    desc: 'The Snowboarding App was the final project for my Mobile Application Development course at California State University, East Bay. I utilized device location, accelerator, and Google Maps to track the user\'s location, speed, and direction. I tested the app at Squaw Valley Ski Resort in Olympic Valley, CA, during the development process. This project expanded my knowledge in native mobile app development.',
    year: '2014',
    tech:[					
      {
        name:'Native Android',
        tag: 'icon-iphone'
      },
      {
        name:'Java',
        tag: 'icon-java'
      }
    ]				
  },
]

export const ICONS: Tech[] = [
    {
      name:'React JS',
      tag: 'icon-reactjs'
    },
    {
      name:'CSS3',
      tag: 'icon-css3'
    },
    {
      name:'HTML5',
      tag: 'icon-html5'
    },
    {
      name:'JavaScript',
      tag: 'icon-javascript'
    },
    {
      name:'React Native',
      tag: 'icon-iphone'
    },
    {
      name:'NodeJS',
      tag: 'icon-nodejs'
    },
    {
      name:'PHP',
      tag: 'icon-php'
    },
    {
      name:'Responsive Design',
      tag: 'icon-mobile-device'
    },
    {
      name:'npm',
      tag: 'icon-npm'
    },
    {
      name:'AWS',
      tag: 'icon-aws'
    },
    {
      name:'GCP',
      tag: 'icon-google-developers'
    }
]

export const CERTIFICATE: CERTIFICATE_TYPE[] = [
  {
    title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp 2024',
    desc: 'Udemy Lecture about Node, Express and mongo DB. We created fully working fullstack app for tourism',
    img: 'node.jpg',
    date: 'April 2024'
  },
  {
    title: 'Typescript: The Complete Developer\'s Guide',
    desc: 'Udemy Lecture about Typescript, we learned interface, generics anything related with ts development',
    img: 'typescript.jpg',
    date: 'April 2024'
  },
  {
    title: ' GraphQL with React: The Complete Developers Guide',
    desc: 'Udemy Lecture about GraphQL, we learned how to set up Graph QL on both client and server side. Worked on CRUD via Graph QL',
    img: 'gql.jpg',
    date: 'April 2024'
  }
]

export const WEB_EXPERIENCE: EXPERIENCES_TYPE[]= [
  {
    sec: 'web',
    title: 'Telus TV catalog for eCommerce page',
    desc: 'The First 6 months and the last 1 year while I was working for the company. My team was working on a TV catalog for existing customers. I worked on rebranding, new features integration, and optimization of the webpage. The team was a highly collaborative environment with many parties.',
    tech: [
      {
        name: 'ReactJS',
        tag: 'icon-reactjs'
      },
      {
        name: 'npm',
        tag: 'icon-npm'
      },
      {
        name:'Responsive Design',
        tag: 'icon-mobile-device'
      }
    ]
  },
  {
    sec: 'web',
    title: 'Telus Home Security eCommerce page',
    desc: ' I have worked on home security products for about 6 months while I was in the company. Our team collaborated closely with stakeholders, designers, and the API team to add some new products to the catalog.',
    tech: [
      {
        name: 'ReactJS',
        tag: 'icon-reactjs'
      },
      {
        name: 'npm',
        tag: 'icon-npm'
      },
      {
        name:'Responsive Design',
        tag: 'icon-mobile-device'
      }
    ]
  },
  {
    sec: 'web',
    title: 'Digital Ad for partner store',
    desc: ' While I was working on GMD, I got involved in the full SDLC of a digital advertisement project. I worked with stakeholders closely to create design poc, working poc and production development. Also, I had a chance to work on DevOps tasks for this project.',
    tech: [
      {
        name: 'ReactJS',
        tag: 'icon-reactjs'
      },
      {
        name: 'nodejs',
        tag: 'icon-nodejs'
      },
      {
        name: 'mongoDB',
        tag: 'icon-mongodb'
      },
      {
        name:'Responsive Design',
        tag: 'icon-mobile-device'
      }
    ]
  },
  {
    sec:'web',
    title: 'U.S. Bank Homepage',
    desc: 'My assignment was to translate all of the visual guides into a real webpage. I collaborated closely with the design team, accessibility team, and developer team to rebrand and build the U.S. Bank homepage. I was able to manage the challenges in this project through a solution based work ethic, strong problem-solving skills, and an innovative perspective.',
    tech:[
      {
        name:'AngularJS',
        tag:'icon-angular-alt'
      },
      {
        name:'Bootstrap',
        tag:'icon-bootstrap'
      },
      {
        name:'JQuery',
        tag:'icon-jquery'
      },
      {
        name:'CSS3',
        tag:'icon-css3'
      },
      {
        name:'HTML5',
        tag:'icon-html5'
      },
      {
        name:'Responsive Design',
        tag: 'icon-mobile-device'
      }		
    ]
  },
  {
    sec:'web',
    title: 'Partner company\'s rebranding AEM template mockup',  			
    desc: 'I was responsible for creating the mockups for each component of the Elavon FIS rebranding page. I closely collaborated with the client, design team, and the AEM developer team. This assignment strengthened my experience in AEM development, usage of Angular JS in AEM components, and best stylesheet practices for AEM components.',
    tech:[
      {
        name:'AngularJS',
        tag:'icon-angular-alt'
      },
      {
        name:'Bootstrap',
        tag:'icon-bootstrap'
      },
      {
        name:'CSS3',
        tag:'icon-css3'
      },
      {
        name:'HTML5',
        tag:'icon-html5'
      },
      {
        name:'AEM',
        tag:'icon-shell'
      },
      {
        name:'Responsive Design',
        tag:'icon-mobile-device'
      }
    ]
  },
  {
    sec:'web',
    title: 'Partner company\'s mobile app',  			
    desc: 'As the main developer for this project, I developed HTML mock-ups for the AEM page and integrated them into AEM components. This opportunity increased my knowledge of the sling model, OSGI bundle, HTL, and user experience oriented design.',
    tech:[
      {
        name:'AngularJS',
        tag:'icon-angular-alt'
      },
      {
        name:'Bootstrap',
        tag:'icon-bootstrap'
      },
      {
        name:'CSS3',
        tag:'icon-css3'
      },
      {
        name:'HTML5',
        tag:'icon-html5'
      },
      {
        name:'AEM',
        tag:'icon-shell'
      },
      {
        name:'Responsive Design',
        tag:'icon-mobile-device'
      }
    ]
  },
  {
    sec:'web',
    title: 'Internal iPad training App',  			
    desc: 'I designed and developed U.S. Bank\'s internal website utilizing Angular JS in a short time period. The website included video content; I learned a workaround for streaming via a low bandwidth user.',
    tech:[
      {
        name:'AngularJS',
        tag:'icon-angular-alt'
      },
      {
        name:'Bootstrap',
        tag:'icon-bootstrap'
      },
      {
        name:'CSS3',
        tag:'icon-css3'
      },
      {
        name:'HTML5',
        tag:'icon-html5'
      },
      {
        name:'Responsive Design',
        tag:'icon-mobile-device'
      }
    ]
  },
  {
    sec:'web',
    title: 'Wealth Management: Responsive POC',  			
    desc: 'I developed the design POC for this project in 4 hours. I successfully managed a high-pressure, fast-paced development environment, delivering the page within a very short time frame. Although the project was time sensitive; I was able to utilize bootstrap to deliver a quality product.',
    tech:[
      {
        name:'AngularJS',
        tag:'icon-angular-alt'
      },
      {
        name:'Bootstrap',
        tag:'icon-bootstrap'
      },
      {
        name:'CSS3',
        tag:'icon-css3'
      },
      {
        name:'HTML5',
        tag:'icon-html5'
      },
      {
        name:'Responsive Design',
        tag:'icon-mobile-device'
      }
    ]
  }
]

export const TYPE_OF_CONTENT: TYPE_OF_CONTENT_TYPE = {
  certificate: 'certificate',
  experience: 'experience',
  bio: 'bio'
}

export const LINKEDIN_LINK: string = "https://www.linkedin.com/in/rmatsuda/"
export const EMAIL: string = "rmatsuda686ca@gmail.com"

export const FEATURE_FLAGS: FEATURE_FLAGS_TYPE= {
  enableIntro: true,
  enableBio: true,
  enableTech: true,
  enableFooter: true,
  enableExperience: true
}