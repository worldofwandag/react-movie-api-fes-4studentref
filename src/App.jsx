import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Footer from './components/Footer.jsx'

const App = () =>  {
  
  const [searchData, setSearchData] = useState({
    results: [],
    query: ''
  })

  return (
    <>
    <Router>
      <Nav setSearchData={setSearchData} />
      <Routes>
        <Route path='/' exact element={<Home searchData={searchData} />} />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
