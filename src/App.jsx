import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import MovieDetails from './components/ui/MovieDetails.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ':imdbID', element: <MovieDetails /> },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
