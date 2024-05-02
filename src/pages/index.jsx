import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import LandingPageContainer from './landingPage'
import ProjectDescription from './projectDescription'

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={
            <LandingPageContainer />
          }
        />
        <Route
          path='/projects'
          element={
              <ProjectDescription />
             }
        />
      </Routes>
    </BrowserRouter>
    
  )
}