import './App.css'
import AboutComponent from './components/AboutComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import LiftComponent from './components/LiftComponent'
import ListLiftComponent from './components/ListLiftComponent'
// import VisualComponent from './components/VisualComponent'
// Import below functions from react-router-dom in order to add routing
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
          <HeaderComponent />
            <Routes>
              {/* //http://localhost:3000 */}
              <Route path = "/" element= {<ListLiftComponent />}> </Route>
              
              {/* //http://localhost:3000/lifts */}
              <Route path = "/lifts" element = {<ListLiftComponent />}> </Route>
              {/* //http://localhost:3000/add-lift */}
              <Route path = "/add-lift" element = {<LiftComponent />}> </Route>
              {/* //http://localhost:3000/edit-lift/1 */}
              <Route path = "/edit-lift/:id" element = {<LiftComponent />}> </Route>
              {/* //http://localhost:3000/about */}
              <Route path = "/about" element = {<AboutComponent />}> </Route>
              {/* //http://localhost:3000/visual */}
              {/* <Route path = "/visual" element = {<VisualComponent />}> </Route> */}
            </Routes>
          <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
