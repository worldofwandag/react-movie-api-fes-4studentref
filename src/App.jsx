import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'

import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import MovieDetails from './components/ui/MovieDetails.jsx'

const App = () =>  {
  
  const [searchData, setSearchData] = useState({
    results: [],
    query: '' //necessary to show what user searched for dynamically.  This is the only reason query property is here
  })
  
  const [loading, setLoading] = useState(true)
  //skeleton loading state lives in highest parent

  return (
    <>
    <Router>
      <Nav setSearchData={setSearchData} setLoading={setLoading} />
      <Routes>
        <Route path='/' exact element={<Home searchData={searchData} loading={loading} />} />
        <Route path='/:imdbID' exact element={<MovieDetails />}  />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App

// Below shows what the useState would look like without trying to make the search Term displayed dynamically
// const [searchResults, setSearchResults] = useState([])