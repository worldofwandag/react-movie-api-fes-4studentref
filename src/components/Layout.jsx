import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

const Layout = () => {
  const [searchData, setSearchData] = useState({
    results: [],
    query: '' //necessary to show what user searched for dynamically.  This is the only reason query property is here
  })

  const [loading, setLoading] = useState(true)
  //skeleton loading state lives here since Nav triggers it and Home displays it

  return (
    <>
      <Nav setSearchData={setSearchData} setLoading={setLoading} />
      <Outlet context={{ searchData, loading }} />
      <Footer />
    </>
  )
}

export default Layout
